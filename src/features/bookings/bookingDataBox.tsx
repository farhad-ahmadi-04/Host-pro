
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { statusStyle } from "@/config/statusStyle";
import { formatCurrency, formatDistanceFromNow } from "@/lib/utils";
import { IBooking } from "@/types/bookingTypes";
import { format, isToday } from "date-fns";
import { BadgeCheck, BadgeX, Dot, Euro, HouseIcon } from "lucide-react";

function BookingDataBox({ booking }: { booking: IBooking | undefined }) {
    return (
        <Card className="pt-0">
            <CardHeader className={`flex flex-col md:flex-row gap-2 md:gap-4 justify-between p-4 text-lg w-full ${booking && statusStyle[booking.status]} rounded`}>
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
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="py-4 space-y-3">
                    <div className="flex gap-4">
                        <img src={booking?.guests.countryFlag} alt={booking?.guests.nationality} className="w-6 h-5" />
                        <span>
                            {booking?.guests.fullName} {booking && booking.numGuests > 1 ? `+${booking.numGuests - 1} guests` : ""}
                        </span>
                        <Dot className="text-stone-500 hidden md:block" />
                        <span className="text-stone-500 italic">
                            {booking?.guests.email}
                        </span>
                        <Dot className="text-stone-500 hidden md:block" />
                        <span className="text-stone-500 italic hidden md:block">
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
                    <span>{booking?.isPaid ? <BadgeCheck className="hidden md:block" /> : <BadgeX className="hidden md:block" />}</span>
                </div>
                <CardFooter className="text-sm justify-end">
                    Booked {booking &&
                        `${new Date(booking?.created_at).toLocaleDateString("en-US", { dateStyle: "full" })}
                        ${new Date(booking?.created_at).toLocaleTimeString("en-US", { timeStyle: "short" })}`
                    }
                </CardFooter>
            </CardContent>
        </Card>
    );
}

export default BookingDataBox;