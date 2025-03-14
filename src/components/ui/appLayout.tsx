import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner";


function AppLayout() {
    return (
        <>
            <SidebarProvider>

                <AppSidebar />
                <div className="w-full">
                    <Header>
                        <SidebarTrigger />
                    </Header>
                    <main className="p-2 md:p-5 w-full flex justify-center items-center">
                        {/* container */}
                        <Outlet />
                    </main>
                    <Toaster position="top-center" richColors />
                </div>

            </SidebarProvider>
        </>
    );
}

export default AppLayout;