import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense } from "react"

import { Toaster } from "./components/ui/sonner"
import AppLayout from "@/components/ui/appLayout"
import ProtectedRoute from "./components/protectedRoute"
import SpinnerFullPage from "./components/ui/spinnerFullPage"

// pages..
const Dashboard = lazy(() => import("@/pages/dashboard"))
const Bookings = lazy(() => import("@/pages/bookings"))
const Booking = lazy(() => import("@/pages/booking"))
const Checkin = lazy(() => import("@/pages/checkin"))
const Cabins = lazy(() => import("@/pages/cabins"))
const Users = lazy(() => import("@/pages/users"))
const Settings = lazy(() => import("@/pages/settings"))
const Account = lazy(() => import("@/pages/account"))
const Login = lazy(() => import("@/pages/login"))
const PageNotFound = lazy(() => import("@/pages/pageNotFound"))

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
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
