import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/sidebar";

function AppLayout() {
    return (
        <div className="Layout">
            <Sidebar />
            <Header />
            <main className="main border w-full overflow-y-auto">
                {/* container */}
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AppLayout;