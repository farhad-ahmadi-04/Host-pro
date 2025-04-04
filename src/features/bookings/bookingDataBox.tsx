
import { statusStyle } from "@/config/statusStyle";
import { formatCurrency, formatDistanceFromNow } from "@/lib/utils";
import { IBooking } from "@/types/bookingTypes";
import { format, isToday } from "date-fns";
import { BadgeCheck, BadgeX, Dot, Euro, HouseIcon } from "lucide-react";

function BookingDataBox({ booking }: { booking: IBooking | undefined }) {
    return (
        <div className="bg-sidebar rounded">
            <div className={`flex justify-between p-4 text-lg ${booking && statusStyle[booking.status]} rounded`}>
                <div className="flex gap-4 justify-between w-full">
                    <span className="flex gap-4 items-center">
                        <HouseIcon />
                        {booking?.numNights} night(s) in cabin {booking?.cabins.name}
                    </span>
                    <span>
                        {booking && format(new Date(booking.startDate), "EEE, MMM dd yyyy")} (
                        {booking && isToday(new Date(booking.startDate))
                            ? "Today"
                            : booking && formatDistanceFromNow(booking.startDate)}
                        ) &mdash; {booking && format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
                    </span>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
                <div className="py-4 space-y-3">
                    <div className="flex gap-4">
                        <img src={booking?.guests.countryFlag} alt={booking?.guests.nationality} className="w-6 h-5" />
                        <span>
                            {booking?.guests.fullName} {booking && booking.numGuests > 1 ? `+${booking.numGuests - 1} guests` : ""}
                        </span>
                        <Dot className="text-stone-500" />
                        <span className="text-stone-500 italic">
                            {booking?.guests.email}
                        </span>
                        <Dot className="text-stone-500" />
                        <span className="text-stone-500 italic">
                            National ID {booking?.guests.nationalID}
                        </span>
                    </div>
                    <div>
                        <span className="flex gap-4">{booking?.hasBreakfast ? <BadgeCheck /> : <BadgeX />} Breakfast included? {booking?.hasBreakfast ? "Yes" : "No"}</span>
                    </div>
                </div>
                <div className={`flex justify-between ga-4 p-4 rounded ${booking?.isPaid ? "bg-green-400" : "bg-red-400"}`}>
                    <span className="flex items-center gap-4">
                        <Euro />
                        Total price {!booking?.hasBreakfast ?
                            formatCurrency(booking?.totalPrice ?? 0) :
                            `${formatCurrency(booking?.totalPrice ?? 0)} ( ${formatCurrency(booking?.cabinPrice)} cabin + ${formatCurrency(
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
    );
}

export default BookingDataBox;