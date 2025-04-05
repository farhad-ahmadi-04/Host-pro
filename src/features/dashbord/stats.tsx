import { IBooking, IBookingsState } from "@/types/bookingTypes";
import Stat from "./stat";
import { Briefcase, CalendarDays, ChartColumnIncreasing, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

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

    return (
        <>
            <Stat
                title={"Bookings"}
                icon={<Briefcase />}
                value={numBookings}
                loading={loading} />
            <Stat
                title={"Sales"}
                icon={<DollarSign />}
                value={formatCurrency(sales)}
                loading={loading} />
            <Stat
                title={"Check ins"}
                icon={<CalendarDays />}
                value={checkins.toString()}
                loading={loading} />
            <Stat
                title={"Occupancy rate"}
                icon={<ChartColumnIncreasing />}
                value={Math.round(occupation * 100) + "%"}
                loading={loading} />
        </>

    );
}

export default Stats;