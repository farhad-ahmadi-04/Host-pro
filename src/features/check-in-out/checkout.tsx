import { Button } from "@/components/ui/button";
import useCheckOut from "./useCheckOut";
import React from "react";

function CheckOutButton({ bookingId, children, className }: { bookingId: number, children: React.ReactNode, className: string }) {
    const { checkOut, isCheckingOut } = useCheckOut()

    return (
        <Button
            disabled={isCheckingOut}
            onClick={() => checkOut(bookingId)}
            className={className}
            size={"sm"}
        >
            {children}
        </Button>
    );
}

export default CheckOutButton;