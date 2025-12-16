import { Outlet } from "react-router-dom"

import { AppShell } from "@sola/ui"

import { GlobalPlayer } from "@/components/GlobalPlayer"

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/articles", label: "Articles" },
  { to: "/settings", label: "Settings" },
]

export function AppLayout() {
  return (
    <AppShell
      brand="Sola"
      navItems={navItems}
      header={<div className="text-sm text-muted-foreground">Mobile-first UI</div>}
    >
      <Outlet />
      <GlobalPlayer />
    </AppShell>
  )
}
