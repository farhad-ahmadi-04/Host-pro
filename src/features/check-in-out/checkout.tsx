import { Button } from "@/components/ui/button";
import useCheckOut from "./useCheckOut";

function CheckOutButton({ bookingId }: { bookingId: number }) {
    const { checkOut, isCheckingOut } = useCheckOut()

    return (
        <Button
            disabled={isCheckingOut}
            onClick={() => checkOut(bookingId)}
        >
            Check out
        </Button>
    );
}

export default CheckOutButton;