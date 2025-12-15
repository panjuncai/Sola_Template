import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

function App() {
  const { data, isLoading } = trpc.health.useQuery()

  return (
    <div className="min-h-screen p-6 flex items-center justify-center p-safe">
      <div className="space-y-4 text-center w-full max-w-sm">
        <h1 className="text-2xl font-semibold">Sola</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : data}
        </Button>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              Open Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Mobile Drawer</DrawerTitle>
              <DrawerDescription>
                Vaul + shadcn drawer is working.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="w-full">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export default App
