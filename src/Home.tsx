import { ThemeProvider } from "@/components/theme-provider"
import { Vortex } from "@/components/ui/vortex"
import Navbar from './Navbar.tsx'

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

            <Navbar />

            <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[80vh] overflow-hidden" >
                <Vortex
                    backgroundColor={"#000000"}
                    rangeY={500}
                    particleCount={100}
                    baseHue={300}
                    className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
                >
                    <h2 className="text-2xl md:text-6xl font-bold text-center">
                        Danial Hosseintabar
                    </h2>
                </Vortex>
            </div>

        </ThemeProvider>
    )

}

export default App


export function A() {

}
