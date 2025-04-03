import { Button } from "@/components/ui/button";
import { IBooking } from "@/types/bookingTypes";
import { useNavigate } from "react-router-dom";
import CheckOutButton from "./checkout";

function TodayItem({ activity }: { activity: IBooking }) {
    const navigate = useNavigate()
    const { id, status, guests, numNights } = activity;
    const statusStyle = {
        unconfirmed: "bg-chart-4",
        "checked-out": "bg-ring",
        "checked-in": "bg-chart-2"
    }

    return (
        <div className="grid grid-cols-3 md:grid-cols-[20%_1fr_15%_1fr] gap-x-2 gap-y-3 items-center">
            <span className={`${statusStyle[status]} text-center text-sm rounded truncate`}>
                {status === "unconfirmed" && String("Arriving").toLocaleUpperCase()}
                {status === "checked-in" && String("Departing").toLocaleUpperCase()}
            </span>

            <div className="flex items-center gap-1">
                <img src={guests.countryFlag} alt="flag" className="w-5 h-3" />
                <span className="text-nowrap truncate">{guests.fullName}</span>
            </div>

            <span className="truncate">{numNights} Nights</span>

            {status === "unconfirmed" &&
                <Button className="col-span-3 md:col-span-1" onClick={() => navigate(`/checkin/${id}`)} size={"sm"}>CHECK IN</Button>
            }
            {status === "checked-in" &&
                <CheckOutButton className="col-span-3 md:col-span-1" bookingId={id}>CHECK OUT</CheckOutButton>
            }

        </div>
    );
}

export default TodayItem;