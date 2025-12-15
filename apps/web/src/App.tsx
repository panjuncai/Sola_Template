import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc"

function App() {
  const { data, isLoading } = trpc.health.useQuery()

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Sola</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : data}
        </Button>
      </div>
    </div>
  )
}

export default App
