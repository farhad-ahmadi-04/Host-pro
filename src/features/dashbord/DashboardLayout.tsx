import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import DashboardBox from "./DashboardBox";
import Filter from "@/components/ui/filter";

function DashboardLayout() {
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
                    <DashboardBox />
                    <DashboardBox />
                    <DashboardBox />
                    <DashboardBox />
                </div>
            </Container>
        </Section>
    );
}

export default DashboardLayout;