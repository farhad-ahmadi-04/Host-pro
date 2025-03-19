import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useBooking from "./useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/container";
import DeleteBookingAction from "./deleteBookingAction";
import { useState } from "react";
import BookingDataBox from "./bookingDataBox";

function BookingDetails() {
    const { booking, errorBooking, loadingBooking } = useBooking()
    const navigate = useNavigate()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)



    // handle loading
    if (loadingBooking) return <Skeleton className="w-full h-60" />
    // handle error
    if (errorBooking) return <h1 className="text-center font-bold">{errorBooking.message}...</h1>

    return (
        <Container className="flex flex-col gap-4">

            <BookingDataBox booking={booking} />

            <div className="w-full text-end space-x-2">
                {booking &&
                    <>
                        {booking.status === "unconfirmed" &&
                            <Button onClick={() => navigate(`/checkin/${booking.id}`)}>Check in</Button>
                        }
                        {booking.status === "checked-in" &&
                            <Button>Check out</Button>
                        }

                        <Button variant={"destructive"}
                            onClick={() => setIsDeleteDialogOpen(true)}>
                            Delete Booking</Button>
                        <Button variant={"outline"} onClick={() => navigate(-1)}>Back</Button>

                        <DeleteBookingAction
                            bookingId={booking?.id}
                            isDeleteDialogOpen={isDeleteDialogOpen}
                            setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
                    </>
                }
            </div>



        </Container>
    );
}

export default BookingDetails;