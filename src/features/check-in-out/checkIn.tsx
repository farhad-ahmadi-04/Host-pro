import Container from "@/components/ui/container";
import BookingDataBox from "../bookings/bookingDataBox";
import useBooking from "../bookings/useBooking";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { statusStyle } from "@/config/statusStyle";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

function CheckIn() {
    const { booking, errorBooking, loadingBooking } = useBooking()
    const navigate = useNavigate()
    const [isPaid, setIsPaid] = useState(false)
    const [addBreakfast, setAddBreakfast] = useState(false)

    useEffect(() => booking && setIsPaid(booking.isPaid ?? false), [booking])

    // handle loading
    if (loadingBooking) return <Skeleton className="w-full h-60" />
    // handle error
    if (errorBooking) return <h1 className="text-center font-bold">{errorBooking.message}...</h1>

    const optionalBreakfastPrice = booking && 10 * booking?.numGuests * booking?.numNights

    return (
        <Container className="flex flex-col gap-4">
            <div className="w-full flex justify-between">
                <Button variant={"outline"} onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Back
                </Button>
                <div className="flex w-full gap-4 items-center justify-end">
                    <h1 className="font-semibold text-xl">Check in booking #{booking?.id}</h1>
                    <span className={`${booking && statusStyle[booking.status]} h-fit px-4 text-center rounded`}>
                        {booking && booking.status.charAt(0).toLocaleUpperCase() + booking.status.slice(1).split("-").join(" ")}
                    </span>
                </div>
            </div>

            <BookingDataBox booking={booking} />

            <div className="flex flex-col gap-4">
                {!booking?.hasBreakfast &&
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id="breakfast"
                            checked={addBreakfast}
                            onClick={() => {
                                setAddBreakfast((confirm) => !confirm)
                                setIsPaid(false)
                            }} />
                        <Label htmlFor="breakfast">
                            Want to add breakfast for {optionalBreakfastPrice && formatCurrency(optionalBreakfastPrice)}?
                        </Label>
                    </div>
                }

                <div className="flex items-center gap-4">
                    <Checkbox
                        id="paid"
                        checked={isPaid}
                        onClick={() => {
                            setIsPaid((confirm) => !confirm)
                        }}
                        disabled={isPaid} />
                    <Label htmlFor="paid">
                        I confirm that {booking?.guests.fullName} has paid the total mount
                        {!addBreakfast ?
                            formatCurrency(booking?.totalPrice ?? 0)
                            :
                            `${(booking && optionalBreakfastPrice) &&
                            formatCurrency(booking?.totalPrice + optionalBreakfastPrice)}
                            ( ${formatCurrency(booking?.cabinPrice ?? 0)} cabin + ${formatCurrency(
                                optionalBreakfastPrice ?? 0
                            )} breakfast )`
                        }
                    </Label>
                </div>
            </div>

            <div className="w-full text-end space-x-2">
                {booking &&
                    <>
                        <Button disabled={!isPaid}>Check in booking #{booking.id}</Button>
                        <Button variant={"outline"} onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </>
                }
            </div>
        </Container>
    );
}

export default CheckIn;