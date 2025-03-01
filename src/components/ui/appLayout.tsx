import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "../mode-toggle";

function AppLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full overflow-hidden">
                    <Header>
                        <SidebarTrigger />
                        <ModeToggle />
                    </Header>
                    <main className="p-2 md:p-5 w-full flex justify-center items-center overflow-y-auto">
                        {/* container */}
                        <Outlet />
                    </main>

                </div>
            </SidebarProvider>
        </>
    );
}

export default AppLayout;