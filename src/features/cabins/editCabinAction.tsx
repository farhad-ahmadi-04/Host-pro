import { Payment } from "./cabinColumns";
import CreateCabinForm from "./createCabinForm";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";


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
        <Sheet open={isEditDialogOpen}
            onOpenChange={isEditDialogOpen ?
                setIsEditDialogOpen : undefined}>
            <SheetTitle>
            </SheetTitle>
            {/* content */}
            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit cabin</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                    <CreateCabinForm cabin={cabin} onClose={() => setIsEditDialogOpen?.(false)} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default EditCabinAction;