import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
export type Payment = {
    id: number
    description: string
    created_at: string
    regularPrice: number
    image: string
    discount: number
    maxCapacity: number
    name: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "image",
        header: "image",

        cell: ({ row }) => {
            const imageUrl = row.original.image;
            return (
                <img
                    src={imageUrl}
                    alt="Cabin image"
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                />
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Cabin
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "maxCapacity",
        cell: ({ row }) => {
            const capacity = row.original.maxCapacity;
            return (
                <span>Fits up to {capacity} guests</span>
            );
        },
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Capacity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "regularPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = row.original.regularPrice;
            return (
                formatCurrency(price)
            );
        },
    },
    {
        accessorKey: "discount",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Discount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const discount = row.original.discount;
            return (
                formatCurrency(discount)
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
