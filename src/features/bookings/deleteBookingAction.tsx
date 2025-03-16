import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useDeleteBooking from "./useDeleteBooking";

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

    return (
        <Dialog open={isDeleteDialogOpen}
            onOpenChange={isDeleteDialogOpen ?
                setIsDeleteDialogOpen : undefined}>
            <DialogTrigger>
            </DialogTrigger>
            {/* content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete booking</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this booking permanently? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            disabled={isDeleting}
                            variant={"destructive"}
                            onClick={() => deleteBooking(bookingId)}>
                            Delete
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteBookingAction;