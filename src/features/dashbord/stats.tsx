import { IBookingsState } from "@/types/bookingTypes";
import Stat from "./stat";
import { Briefcase, CalendarDays, ChartColumnIncreasing, DollarSign } from "lucide-react";

function Stats({ bookings = [], cabins = 0 }: {
    bookings?: IBookingsState[];
    cabins?: number
}) {
    console.log(cabins);

    // 1.
    const numBookings = String(bookings.length)

    // //   4.
    // const occupation =
    //     confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    //     (numDays * cabinCount?.length);
    // // num checked in nights / all available nights ()num days * num cabins)


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat
                title={"Bookings"}
                // color={"blue"}
                icon={<Briefcase />}
                value={numBookings} />
            <Stat
                title={"Sales"}
                // color={"blue"}
                icon={<DollarSign />}
                value={numBookings} />
            <Stat
                title={"Check ins"}
                // color={"blue"}
                icon={<CalendarDays />}
                value={numBookings} />
            <Stat
                title={"Occupancy rate"}
                // color={"blue"}
                icon={<ChartColumnIncreasing />}
                value={numBookings} />
        </div>
    );
}

export default Stats;