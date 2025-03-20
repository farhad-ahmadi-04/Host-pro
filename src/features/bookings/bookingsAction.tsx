import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IBooking } from "@/types/bookingTypes";
import { MoreHorizontal } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteBookingAction from "./deleteBookingAction";
import useCheckOut from "../check-in-out/useCheckOut";


function BookingsAction({ bookings }: { bookings: IBooking }) {
    const navigate = useNavigate()
    const [isDeleteDialog, setIsDeleteDialog] = useState<boolean>(false)
    const { checkOut, isCheckingOut } = useCheckOut()

    return (
        <>
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
                        <DropdownMenuItem
                            onClick={() => checkOut(bookings.id)}
                            disabled={isCheckingOut}>Check out</DropdownMenuItem>
                    }
                    <DropdownMenuItem onClick={() => setIsDeleteDialog(true)}>
                        Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* delete dialog component */}
            <DeleteBookingAction isDeleteDialogOpen={isDeleteDialog}
                setIsDeleteDialogOpen={setIsDeleteDialog}
                bookingId={bookings.id}
            />
        </>
    );
}

export default BookingsAction;