import Section from "@/components/ui/section";
import CabinTable from "@/features/cabinTable";

function Cabins() {
    return (
        <Section>
            <div className="flex justify-between">
                <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Cabins</h1>
            </div>
            <div>
                <CabinTable />
            </div>
        </Section >
    );
}

export default Cabins;