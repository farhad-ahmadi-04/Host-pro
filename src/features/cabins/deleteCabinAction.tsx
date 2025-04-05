import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import useDeleteCabin from "./useDeleteCabin";
import { Payment } from "./cabinColumns";


function DeleteCabinAction({
    isDeleteDialogOpen,
    cabin,
    setIsDeleteDialogOpen }:
    {
        isDeleteDialogOpen: boolean,
        cabin: Payment,
        setIsDeleteDialogOpen: ((open: boolean) => void) | undefined
    }) {
    const { deleteCabin, isDeleting } = useDeleteCabin()

    return (
        <Dialog open={isDeleteDialogOpen}
            onOpenChange={isDeleteDialogOpen ?
                setIsDeleteDialogOpen : undefined}>
            <DialogTrigger>
            </DialogTrigger>
            {/* content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete cabin</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this cabin permanently? This action cannot be undone.
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
                            onClick={() => deleteCabin(cabin.id)}>
                            Delete
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteCabinAction;