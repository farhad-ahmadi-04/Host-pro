import { Hotel, House, LayoutDashboardIcon, Settings, User2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboardIcon,
    },
    {
        title: "bookings",
        url: "bookings",
        icon: Hotel,
    },
    {
        title: "Cabins",
        url: "cabins",
        icon: House,
    },
    {
        title: "Users",
        url: "users",
        icon: User2,
    },
    {
        title: "Settings",
        url: "settings",
        icon: Settings,
    },
]


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup className="md:p-3">
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="md:py-6">
                                        <a href={item.url}>
                                            <item.icon />
                                            <span className="md:text-base">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
