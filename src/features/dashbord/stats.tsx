import { IBooking, IBookingsState } from "@/types/bookingTypes";
import Stat from "./stat";
import { Briefcase, CalendarDays, ChartColumnIncreasing, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function Stats({ bookings = [], cabins = 0, confirmedStays, numDays, loading }: {
    bookings?: IBookingsState[];
    cabins?: number;
    confirmedStays: IBooking[];
    numDays: number;
    loading: boolean
}) {

    // 1.
    const numBookings = String(bookings.length)

    // 2.
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)

    // 3.
    const checkins = confirmedStays?.length;

    //   4.
    const occupation =
        confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabins);
    // num checked in nights / all available nights ()num days * num cabins)

    if (loading) return <Skeleton className="h-10 md:h-20" />

    return (
        <>
            <Stat
                title={"Bookings"}
                icon={<Briefcase />}
                value={numBookings} />
            <Stat
                title={"Sales"}
                icon={<DollarSign />}
                value={formatCurrency(sales)} />
            <Stat
                title={"Check ins"}
                icon={<CalendarDays />}
                value={checkins.toString()} />
            <Stat
                title={"Occupancy rate"}
                icon={<ChartColumnIncreasing />}
                value={Math.round(occupation * 100) + "%"} />
        </>

    );
}

export default Stats;