import { Hotel, House, LayoutDashboardIcon, Settings, User2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import Logo from "./ui/logo"
import { Separator } from "./ui/separator"

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
    const { pathname } = useLocation()
    const currentUrl = pathname.split("/")[1]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Logo className="max-w-32 mt-5" />
            </SidebarHeader>
            <Separator className="mt-5" />
            <SidebarContent>
                <SidebarGroup className="text-center">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="md:py-6" isActive={currentUrl === item.title.toLocaleLowerCase()}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span className="md:text-base">{item.title}</span>
                                        </Link>
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
