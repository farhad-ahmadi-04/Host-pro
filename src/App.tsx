import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={
            <AppLayout />
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
    </ThemeProvider>
  )
}

export default App
