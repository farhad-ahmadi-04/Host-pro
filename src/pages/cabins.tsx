import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import CabinTable from "@/features/cabins/cabinTable";

function Cabins() {
    return (
        <Section>
            <Container className="flex flex-col gap-4">
                <div>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">All cabins</h1>
                </div>
                <div>
                    <CabinTable />
                </div>
            </Container>
        </Section >
    );
}

export default Cabins;