import CreateCabinForm from "./createCabinForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function AddCabinAction() {
    const [isCreateCabin, setIsCreateCabin] = useState(false);

    return (
        <Sheet open={isCreateCabin}
            onOpenChange={isCreateCabin ? setIsCreateCabin : undefined}>
            <SheetTrigger className="w-full">
                <Button
                    variant={"secondary"}
                    className="w-full mt-5"
                    onClick={() => setIsCreateCabin?.(true)}
                >
                    Add cabin
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Create cabin</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                    <CreateCabinForm onClose={() => setIsCreateCabin?.(false)} />
                </SheetHeader>
            </SheetContent>
        </Sheet >);
}

export default AddCabinAction;