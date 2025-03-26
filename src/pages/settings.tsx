import Section from "@/components/ui/section";
import UpdateSettingsForm from "@/features/settings/updateSettingsForm";

function Settings() {
    return (<Section>
        <div>
            <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">All bookings</h1>
        </div>
        <div className="lg:w-8/12">
            <UpdateSettingsForm />
        </div>
    </Section>);
}

export default Settings;