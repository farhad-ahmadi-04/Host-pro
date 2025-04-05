import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Payment } from "./cabinColumns";
import { useState } from "react";
import DeleteCabinAction from "./deleteCabinAction";
import EditCabinAction from "./editCabinAction";
import useCreateCabin from "./useCreateCabin";

function CabinAction({ cabin }: { cabin: Payment }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { createCabin, isCreating } = useCreateCabin();

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
            onClick={() => createCabin({
              name: `copy of ${cabin.name}`,
              maxCapacity: cabin.maxCapacity,
              regularPrice: cabin.regularPrice,
              discount: cabin.discount,
              image: cabin.image,
              description: cabin.description,
            })}
            disabled={isCreating}>
            Duplicate
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <DeleteCabinAction
        cabin={cabin}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <EditCabinAction
        cabin={cabin}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}

export default CabinAction;
