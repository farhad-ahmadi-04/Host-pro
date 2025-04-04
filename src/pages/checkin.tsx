import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import CheckIn from "@/features/check-in-out/checkIn";

function Checkin() {
    return (
        <Section>
            <Container className="flex flex-col gap-4">
                <div>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Check in</h1>
                </div>
                <div>
                    <CheckIn />
                </div>
            </Container>
        </Section>
    );
}

export default Checkin;