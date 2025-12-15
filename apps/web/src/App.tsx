import { trpc } from "@/lib/trpc"
import * as React from "react"
import { AppShell, Button, ResponsiveOverlay } from "@sola/ui"

function App() {
  const { data, isLoading } = trpc.health.useQuery()
  const [activeKey, setActiveKey] = React.useState("home")
  const [overlayOpen, setOverlayOpen] = React.useState(false)

  return (
    <AppShell
      brand="Sola"
      navItems={[
        { key: "home", label: "Home" },
        { key: "overlay", label: "Overlay" },
        { key: "settings", label: "Settings" },
      ]}
      activeKey={activeKey}
      onNavigate={(key) => {
        setActiveKey(key)
        if (key === "overlay") setOverlayOpen(true)
      }}
      header={<div className="text-sm text-muted-foreground">Mobile-first UI</div>}
    >
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sola</h1>
          <p className="text-sm text-muted-foreground">
            Responsive AppShell + tRPC + mobile overlay.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button className="bg-blue-500 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Connecting..." : data}
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOverlayOpen(true)}
          >
            Open Responsive Overlay
          </Button>
        </div>

        <ResponsiveOverlay
          open={overlayOpen}
          onOpenChange={setOverlayOpen}
          title="ResponsiveOverlay"
          description="Mobile uses Drawer; desktop uses Dialog."
        >
          <div className="space-y-2 text-sm">
            <p>
              This content is shared across breakpoints. Business only writes one
              overlay.
            </p>
            <p className="text-muted-foreground">
              Current tab: <span className="font-medium">{activeKey}</span>
            </p>
          </div>
        </ResponsiveOverlay>
      </div>
    </AppShell>
  )
}

export default App
