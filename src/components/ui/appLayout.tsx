import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"


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

                </div>

            </SidebarProvider>
        </>
    );
}

export default AppLayout;