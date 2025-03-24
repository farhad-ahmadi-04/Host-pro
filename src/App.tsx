import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AppLayout from "@/components/ui/appLayout"
// pages..
import Dashboard from "@/pages/dashboard"
import Bookings from "@/pages/bookings"
import Booking from "@/pages/booking"
import Checkin from "@/pages/checkin"
import Cabins from "@/pages/cabins"
import Users from "@/pages/users"
import Settings from "@/pages/settings"
import Account from "@/pages/account"
import Login from "@/pages/login"
import PageNotFound from "@/pages/pageNotFound"
import { Toaster } from "./components/ui/sonner"
import ProtectedRoute from "./components/protectedRoute"

// create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        {/* active  QueryDevtools*/}
        <ReactQueryDevtools initialIsOpen={true} />
        <Toaster position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            <Route element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate replace to={"dashboard"} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
