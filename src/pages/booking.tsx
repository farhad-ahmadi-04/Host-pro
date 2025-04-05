import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import BookingDetails from "@/features/bookings/bookingDetails";

function Booking() {
    return <Section>
        <Container className="flex flex-col gap-4">
            <div>
                <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Update your account</h1>
            </div>
            <div className="flex flex-col gap-2">
                <BookingDetails />
            </div>
        </Container>
    </Section>
        ;
}

export default Booking;