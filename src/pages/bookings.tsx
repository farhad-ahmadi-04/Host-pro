import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import BookingTable from "@/features/bookings/bookingTable";

function Bookings() {
    return (
        <Section>
            <Container className="flex flex-col gap-4">

                <div>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">All bookings</h1>
                </div>
                <div>
                    <BookingTable />
                </div>
            </Container>
        </Section>
    );
}

export default Bookings;