import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "@/pages/dashboard"
import AppLayout from "@/components/ui/appLayout"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={
            <AppLayout />
          }>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
