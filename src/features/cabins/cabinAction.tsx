import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import useDeleteCabin from "./useDeleteCabin";

function CabinAction({ id }: { id: number }) {
  const { deleteCabin, isDeleting } = useDeleteCabin()

  return (
    <Dialog>
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
            onClick={() => navigator.clipboard.writeText(id.toString())}
          >
            Duplicate
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>
            <DialogTrigger>
              <Button size={"icon"} variant={"ghost"}>Delete</Button>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
              onClick={() => deleteCabin(id)}>
              Delete
            </Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CabinAction;
