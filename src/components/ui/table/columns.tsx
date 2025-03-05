import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../button"
import { MoreHorizontal } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

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
        header: "Cabin",
    },
    {
        accessorKey: "maxCapacity",
        header: "Capacity",
        cell: ({ row }) => {
            const capacity = row.original.maxCapacity;
            return (
                <span>Fits up to {capacity} guests</span>
            );
        },
    },
    {
        accessorKey: "regularPrice",
        header: "Price",
        cell: ({ row }) => {
            const price = row.original.regularPrice;
            return (
                formatCurrency(price)
            );
        }
    },
    {
        accessorKey: "discount",
        header: "Discount",
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
