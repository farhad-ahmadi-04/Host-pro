import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import Filter from "@/components/ui/filter";
import useRecentBookings from "./useRecentBookings";
import Stats from "./stats";
import useCabins from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";
import TodayActivity from "../check-in-out/todayActivity";
import { DurationChart } from "./durationChart";
import SalesChart from "./salesChart";



function DashboardLayout() {
    const { bookings, isLoading } = useRecentBookings()
    const { confirmedStays, isLoading: isLoading02, numDays } = useRecentStays()
    const { cabins, isLoading: isLoading03 } = useCabins()

    return (
        <Section>
            <Container className="space-y-5">
                <div className="flex justify-between">
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Dashboard</h1>
                    <Filter filterField="last" options={[
                        { value: "7", label: "Last 7 days" },
                        { value: "30", label: "Last 30 days" },
                        { value: "90", label: "Last 90 days" },
                    ]} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stats
                        bookings={bookings}
                        confirmedStays={confirmedStays || []}
                        numDays={numDays}
                        cabins={cabins?.length}
                        loading={isLoading || isLoading02 || isLoading03}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TodayActivity />
                    <DurationChart confirmedStays={confirmedStays || []} />
                </div>
                <div>
                    <SalesChart bookings={bookings} numDays={numDays} />
                </div>
            </Container>
        </Section>
    );
}

export default DashboardLayout;