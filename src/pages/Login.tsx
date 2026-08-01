import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { LanguageToggle } from '@/components/layout/LanguageToggle'
import { useTranslation } from '@/i18n/useTranslation'
import { useAuthStore } from '@/store/useAuthStore'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormErrors {
  email?: string
  password?: string
}

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = `${t('login.submit')} · ${t('app.name')}`
  }, [t])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = t('login.errorEmail')
    if (password.length < 6) nextErrors.password = t('login.errorPassword')
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    // No backend here — a short delay just makes the transition feel real.
    window.setTimeout(() => {
      login(email)
      navigate('/dashboard', { replace: true })
    }, 500)
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Marketing panel — desktop only, keeps the mobile view focused. */}
      <aside className="relative hidden overflow-hidden bg-primary/5 p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"
        />
        <div className="relative flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            {t('app.name')}
          </span>
        </div>
        <div className="relative max-w-md space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight">
            {t('login.marketingTitle')}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {t('login.marketingBody')}
          </p>
        </div>
        <p className="relative text-xs text-muted-foreground">{t('app.tagline')}</p>
      </aside>

      <main className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex justify-center lg:hidden">
              <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-soft">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('login.welcome')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email ? (
                <p id="email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder={t('login.passwordPlaceholder')}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password ? (
                <p id="password-error" className="text-xs text-destructive">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" /> : null}
              {submitting ? t('login.signingIn') : t('login.submit')}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {t('login.demoNote')}
          </p>
        </div>
      </main>
    </div>
  )
}
