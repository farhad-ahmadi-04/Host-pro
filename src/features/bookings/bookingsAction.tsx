import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IBooking } from "@/types/bookingTypes";
import { MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom";


function BookingsAction({ bookings }: { bookings: IBooking }) {
    const navigate = useNavigate()

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
                    onClick={() => navigate(`${bookings.id}`)}
                >
                    Details
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                {bookings.status === "unconfirmed" &&
                    <DropdownMenuItem
                        onClick={() => navigate(`/checkIn/${bookings.id}`)}
                    >
                        Check in
                    </DropdownMenuItem>}

                {bookings.status === "checked-in" &&
                    <DropdownMenuItem>Check out</DropdownMenuItem>
                }
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default BookingsAction;