import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Payment } from "./cabinColumns";


function EditCabinAction({
    isEditDialogOpen,
    cabin,
    setIsEditDialogOpen }:
    {
        isEditDialogOpen: boolean,
        cabin: Payment,
        setIsEditDialogOpen: ((open: boolean) => void) | undefined
    }) {

    return (
        <Dialog open={isEditDialogOpen}
            onOpenChange={isEditDialogOpen ?
                setIsEditDialogOpen : undefined}>
            <DialogTrigger>
            </DialogTrigger>
            {/* content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit cabin</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to Edit this cabin permanently? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => console.log(cabin)}>

                            Edit
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditCabinAction;