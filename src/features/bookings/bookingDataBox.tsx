import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { IBooking } from "@/types/bookingTypes";
import { ArrowLeft, BadgeCheck, BadgeX, Euro, HouseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// status style
const statusStyle = {
    unconfirmed: "bg-chart-4",
    "checked-out": "bg-ring",
    "checked-in": "bg-chart-2"
}

function BookingDataBox({ booking }: { booking: IBooking | undefined }) {
    const navigate = useNavigate()


    return (
        <>
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
                <div className="p-4 flex flex-col gap-4">
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
                    <div className="text-sm text-end">
                        Booked {booking &&
                            `${new Date(booking?.created_at).toLocaleDateString("en-US", { dateStyle: "full" })}
                        ${new Date(booking?.created_at).toLocaleTimeString("en-US", { timeStyle: "short" })}`
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingDataBox;