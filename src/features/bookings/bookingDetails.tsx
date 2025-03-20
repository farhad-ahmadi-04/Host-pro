import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useBooking from "./useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/container";
import DeleteBookingAction from "./deleteBookingAction";
import { useState } from "react";
import BookingDataBox from "./bookingDataBox";
import { ArrowLeft } from "lucide-react";
import { statusStyle } from "@/config/statusStyle";
import useCheckOut from "../check-in-out/useCheckOut";


function BookingDetails() {
    const { booking, errorBooking, loadingBooking } = useBooking()
    const { checkOut, isCheckingOut } = useCheckOut()
    const navigate = useNavigate()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)



    // handle loading
    if (loadingBooking) return <Skeleton className="w-full h-60" />
    // handle error
    if (errorBooking) return <h1 className="text-center font-bold">{errorBooking.message}...</h1>

    return (
        <Container className="flex flex-col gap-4">
            <div className="w-full flex justify-between">
                <Button variant={"outline"} onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back
                </Button>
                <div className="flex w-full gap-4 items-center justify-end">
                    <h1 className="font-semibold text-xl">Booking #{booking?.id}</h1>
                    <span className={`${booking && statusStyle[booking.status]} h-fit px-4 text-center rounded`}>
                        {booking && booking.status.charAt(0).toLocaleUpperCase() + booking.status.slice(1).split("-").join(" ")}
                    </span>
                </div>
            </div>
            <BookingDataBox booking={booking} />

            <div className="w-full text-end space-x-2">
                {booking &&
                    <>
                        {booking.status === "unconfirmed" &&
                            <Button onClick={() => navigate(`/checkin/${booking.id}`)}>Check in</Button>
                        }
                        {booking.status === "checked-in" &&
                            <Button
                                onClick={() => checkOut(booking.id, {
                                    onSuccess: () => navigate("/")
                                })}
                                disabled={isCheckingOut}>
                                Check out
                            </Button>
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