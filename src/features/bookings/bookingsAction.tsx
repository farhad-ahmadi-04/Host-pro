import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IBooking } from "@/types/bookingTypes";
import { MoreHorizontal } from "lucide-react"


function BookingsAction({ bookings }: { bookings: IBooking }) {
    console.log(bookings);

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
                    onClick={() => navigator.clipboard.writeText(bookings.id.toString())}
                >
                    Details
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                {bookings.status === "unconfirmed" && <DropdownMenuItem>Check in</DropdownMenuItem>}
                {bookings.status === "checked-in" && <DropdownMenuItem>Check out</DropdownMenuItem>}
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default BookingsAction;