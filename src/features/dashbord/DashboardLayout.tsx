import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import DashboardBox from "./DashboardBox";

function DashboardLayout() {
    return (
        <Section>
            <Container>
                <div>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Dashboard</h1>
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