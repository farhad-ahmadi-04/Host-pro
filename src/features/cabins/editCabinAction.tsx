import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Payment } from "./cabinColumns";
import CreateCabinForm from "./createCabinForm";


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
            <DialogContent className="sm:max-w-md max-h-9/12 overflow-y-auto top-[10%]">
                <DialogTitle>Edit cabin</DialogTitle>
                <DialogDescription>
                </DialogDescription>
                <CreateCabinForm cabin={cabin} onClose={() => setIsEditDialogOpen?.(false)} />
            </DialogContent>
        </Dialog>
    );
}

export default EditCabinAction;