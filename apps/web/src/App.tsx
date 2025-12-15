import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Sola</h1>
        <Button className="bg-blue-500 hover:bg-blue-700">
          Sola Ready (Fastify)
        </Button>
      </div>
    </div>
  )
}

export default App
