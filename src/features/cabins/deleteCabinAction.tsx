import { Button } from "@/components/ui/button";
import useDeleteCabin from "./useDeleteCabin";
import { Payment } from "./cabinColumns";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


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
        <Sheet open={isDeleteDialogOpen}
            onOpenChange={isDeleteDialogOpen ?
                setIsDeleteDialogOpen : undefined}>
            <SheetTrigger>
            </SheetTrigger>
            {/* content */}
            <SheetContent className="sm:max-w-md" side="top">
                <SheetHeader>
                    <SheetTitle>Delete cabin</SheetTitle>
                    <SheetDescription>
                        Are you sure you want to delete this cabin permanently? This action cannot be undone.
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
                            onClick={() => deleteCabin(cabin.id)}>
                            Delete
                        </Button>
                    </SheetClose>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default DeleteCabinAction;