import { Button } from "@/components/ui/button";
import useDeleteBooking from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function DeleteBookingAction({
    isDeleteDialogOpen,
    bookingId,
    setIsDeleteDialogOpen }:
    {
        isDeleteDialogOpen: boolean,
        bookingId: number,
        setIsDeleteDialogOpen: ((open: boolean) => void) | undefined
    }) {
    const { deleteBooking, isDeleting } = useDeleteBooking()
    const navigate = useNavigate()

    return (
        <Sheet open={isDeleteDialogOpen}
            onOpenChange={isDeleteDialogOpen ?
                setIsDeleteDialogOpen : undefined}>
            <SheetTrigger>
            </SheetTrigger>

            {/* content */}
            <SheetContent className="sm:max-w-md" side="top">
                <SheetHeader>
                    <SheetTitle>Delete booking</SheetTitle>
                    <SheetDescription>
                        Are you sure you want to delete this booking permanently? This action cannot be undone.
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter className="sm:justify-start">
                    <SheetClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            disabled={isDeleting}
                            variant={"destructive"}
                            onClick={() => {
                                deleteBooking(bookingId)
                                navigate("/bookings")
                            }}>
                            Delete
                        </Button>
                    </SheetClose>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}


export default DeleteBookingAction;