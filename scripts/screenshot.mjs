import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../docs/screenshots')
mkdirSync(outDir, { recursive: true })

const BASE_URL = 'http://localhost:5173'

// Runs before any page script, so Zustand's persist middleware hydrates
// from these values on the very first render — a post-load localStorage
// write is too late, since the store is created at module-import time.
function seedStorage({ theme, language, authenticated }) {
  localStorage.setItem(
    'crm-preferences',
    JSON.stringify({ state: { theme, language }, version: 0 }),
  )
  if (authenticated) {
    localStorage.setItem(
      'crm-auth',
      JSON.stringify({
        state: {
          user: { email: 'demo@nimbuscrm.dev', name: 'Demo User' },
          isAuthenticated: true,
        },
        version: 0,
      }),
    )
  } else {
    localStorage.removeItem('crm-auth')
  }
}

async function shoot(page, name) {
  await page.waitForTimeout(1400)
  await page.screenshot({ path: path.join(outDir, `${name}.png`) })
  console.log('captured', name)
}

function logErrors(page) {
  page.on('pageerror', (err) => console.log('  [pageerror]', err.message))
}

async function freshPage(browser, viewport, seed) {
  const ctx = await browser.newContext({ viewport })
  await ctx.addInitScript(seedStorage, seed)
  const page = await ctx.newPage()
  logErrors(page)
  return { ctx, page }
}

async function run() {
  const browser = await chromium.launch()
  const desktop = { width: 1440, height: 900 }
  const mobile = { width: 375, height: 812 }

  // --- Login page ---
  {
    const { ctx, page } = await freshPage(browser, desktop, {
      theme: 'light',
      language: 'en',
      authenticated: false,
    })
    await page.goto(`${BASE_URL}/#/login`, { waitUntil: 'load' })
    await page.fill('#email', 'demo@nimbuscrm.dev')
    await page.fill('#password', 'demopass123')
    await shoot(page, '01-login')
    await ctx.close()
  }

  // --- Desktop, light theme, English ---
  {
    const { ctx, page } = await freshPage(browser, desktop, {
      theme: 'light',
      language: 'en',
      authenticated: true,
    })

    await page.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'load' })
    await shoot(page, '02-dashboard-light')

    await page.goto(`${BASE_URL}/#/clients`, { waitUntil: 'load' })
    await shoot(page, '03-clients-light')

    await page.goto(`${BASE_URL}/#/deals`, { waitUntil: 'load' })
    await shoot(page, '04-deals-kanban')

    await page.goto(`${BASE_URL}/#/tasks`, { waitUntil: 'load' })
    await shoot(page, '05-tasks-light')

    await ctx.close()
  }

  // --- Desktop, dark theme ---
  {
    const { ctx, page } = await freshPage(browser, desktop, {
      theme: 'dark',
      language: 'en',
      authenticated: true,
    })

    await page.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'load' })
    await shoot(page, '06-dashboard-dark')

    await page.goto(`${BASE_URL}/#/deals`, { waitUntil: 'load' })
    await shoot(page, '07-deals-dark')

    await ctx.close()
  }

  // --- Russian locale ---
  {
    const { ctx, page } = await freshPage(browser, desktop, {
      theme: 'light',
      language: 'ru',
      authenticated: true,
    })

    await page.goto(`${BASE_URL}/#/dashboard`, { waitUntil: 'load' })
    await shoot(page, '08-dashboard-ru')

    await ctx.close()
  }

  // --- Mobile ---
  {
    const { ctx, page } = await freshPage(browser, mobile, {
      theme: 'light',
      language: 'en',
      authenticated: true,
    })

    await page.goto(`${BASE_URL}/#/tasks`, { waitUntil: 'load' })
    await shoot(page, '09-mobile-tasks')

    await page.getByRole('button', { name: 'Menu', exact: true }).click()
    await shoot(page, '10-mobile-menu')

    await ctx.close()
  }

  await browser.close()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
