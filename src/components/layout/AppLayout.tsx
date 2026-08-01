import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { SidebarNav } from './SidebarNav'
import { MobileSidebar } from './MobileSidebar'
import { useCrmStore } from '@/store/useCrmStore'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const hasLoaded = useCrmStore((state) => state.hasLoaded)
  const isLoading = useCrmStore((state) => state.isLoading)
  const loadData = useCrmStore((state) => state.loadData)

  useEffect(() => {
    if (!hasLoaded && !isLoading) {
      void loadData()
    }
  }, [hasLoaded, isLoading, loadData])

  // Scroll back to the top whenever the route changes.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border/70 bg-card/40 lg:block">
        <SidebarNav />
      </aside>

      <MobileSidebar open={menuOpen} onOpenChange={setMenuOpen} />

      <div className="lg:pl-64">
        <Header onOpenMenu={() => setMenuOpen(true)} />
        <main className="mx-auto w-full max-w-[1400px] animate-fade-in px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
