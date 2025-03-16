import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeCheck, BadgeX, Euro, HouseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useBooking from "./useBooking";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/container";
import { formatCurrency } from "@/lib/utils";
import DeleteBookingAction from "./deleteBookingAction";
import { useState } from "react";

function BookingDetails() {
    const { booking, errorBooking, loadingBooking } = useBooking()
    const navigate = useNavigate()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // status style
    const statusStyle = {
        unconfirmed: "bg-chart-4",
        "checked-out": "bg-ring",
        "checked-in": "bg-chart-2"
    }

    // handle loading
    if (loadingBooking) return <Skeleton className="w-full h-60" />
    // handle error
    if (errorBooking) return <h1 className="text-center font-bold">{errorBooking.message}...</h1>

    return (
        <Container className="flex flex-col gap-4">
            {/* head */}
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
            {/* body */}
            <div className="bg-sidebar rounded">
                <div className={`flex justify-between p-4 text-lg ${booking && statusStyle[booking.status]} rounded`}>
                    <div className="flex gap-4 justify-between w-full">
                        <span className="flex gap-4 items-center">
                            <HouseIcon />
                            {booking?.numNights} night(s) in cabin {booking?.cabins.name}
                        </span>
                        <span>{booking?.created_at}</span>
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <div className="py-4 space-y-3">
                        <div className="flex gap-4">
                            <img src={booking?.guests.countryFlag} alt={booking?.guests.nationality} className="w-6 h-5" />
                            <span>
                                {booking?.guests.fullName} {booking && booking.numGuests > 1 ? `+${booking.numGuests - 1}` : ""}
                            </span>
                        </div>
                        <div>
                            <span className="flex gap-4">{booking?.hasBreakfast ? <BadgeCheck /> : <BadgeX />} Breakfast included? {booking?.hasBreakfast ? "Yes" : "No"}</span>
                        </div>
                    </div>
                    <div className={`flex justify-between ga-4 p-4 rounded ${booking?.isPaid ? "bg-green-400" : "bg-red-400"}`}>
                        <span className="flex items-center gap-4">
                            <Euro />
                            Total price {booking && formatCurrency(booking?.totalPrice)}{" "}
                            {booking?.hasBreakfast &&
                                `+ ( ${formatCurrency(booking?.cabinPrice)} cabin + ${formatCurrency(
                                    booking?.extrasPrice
                                )} breakfast )`}
                        </span>
                        <span>{booking?.isPaid ? <BadgeCheck /> : <BadgeX />}</span>
                    </div>
                </div>
            </div>
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