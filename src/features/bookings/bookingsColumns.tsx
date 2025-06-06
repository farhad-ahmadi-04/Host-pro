import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import BookingsAction from "./bookingsAction"
import { IBooking } from "@/types/bookingTypes"
import { format } from "date-fns"

export const bookingsColumns: ColumnDef<IBooking>[] = [
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
        cell: ({ row }) => {
            const date = row.original.created_at
            return <span>{format(new Date(date), "EEE, MMM dd yyyy")}</span>

        }
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
        cell: ({ row }) => {
            // styling
            const statusStyle = {
                unconfirmed: "bg-chart-4",
                "checked-out": "bg-ring",
                "checked-in": "bg-chart-2"
            }
            // start with capital letter
            const capitalized =
                row.original.status.charAt(0).toUpperCase()
                + row.original.status.slice(1)
            return (
                <span
                    className={`${statusStyle[row.original.status]} block w-10/12 text-center rounded`}
                >{capitalized.split("-").join(" ")}</span>
            )
        }
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
            return (
                <BookingsAction bookings={row.original} />
            )
        },
    },
]
