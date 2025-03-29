import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import Filter from "@/components/ui/filter";
import useRecentBookings from "./useRecentBookings";
import Stats from "./stats";
import useCabins from "../cabins/useCabins";



function DashboardLayout() {
    const { bookings, isLoading } = useRecentBookings()
    const { cabins, isLoading: isLoading02 } = useCabins()

    if (isLoading || isLoading02) return <p>Loading...</p>


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

                <Stats bookings={bookings} cabins={cabins} />

            </Container>
        </Section>
    );
}

export default DashboardLayout;