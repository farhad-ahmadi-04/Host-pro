import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCabinForm from "./createCabinForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function AddCabinAction() {
    const [isCreateCabin, setIsCreateCabin] = useState(false);

    return (
        <Dialog open={isCreateCabin}
            onOpenChange={isCreateCabin ? setIsCreateCabin : undefined}>
            <DialogTrigger className="w-full">
                <Button
                    variant={"secondary"}
                    className="w-full mt-5"
                    onClick={() => setIsCreateCabin?.(true)}
                >
                    Add cabin
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-9/12 overflow-y-auto">
                <DialogTitle>Create cabin</DialogTitle>
                <DialogDescription>
                </DialogDescription>
                <CreateCabinForm onClose={() => setIsCreateCabin?.(false)} />
            </DialogContent>
        </Dialog >);
}

export default AddCabinAction;