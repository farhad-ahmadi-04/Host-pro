import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
export type bookingsPayment = {
    id: number
    cabinPrice: number
    extrasPrice: number
    totalPrice: number
    cabins: { name: string }
    guests: { email: string, fullName: string }
    created_at: string
    endDate: string
    startDate: string
    hasBreakfast: boolean
    status: string
}

export const bookingsColumns: ColumnDef<bookingsPayment>[] = [
    {
        accessorKey: "name",
        header: "cabin",
        cell: ({ row }) => {
            const cabinName = row.original.cabins.name
            return (
                <span>{cabinName}</span>
            )
        }
    },
    {
        id: "fullName",
        accessorFn: (row) => row.guests?.fullName,
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const fullName = row.original.guests.fullName
            return <span>{fullName}</span>

        }
    },
    {
        id: "email",
        accessorFn: (row) => row.guests?.email,
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const email = row.original.guests.email
            return <span>{email}</span>

        }
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Dates
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const cabinPrice = row.original.cabinPrice;
            const extrasPrice = row.original.extrasPrice;
            const totalPrice = row.original.totalPrice;
            const amount = cabinPrice + extrasPrice + totalPrice
            return (
                formatCurrency(amount)
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(id.toString())}
                        >
                            Duplicate
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
