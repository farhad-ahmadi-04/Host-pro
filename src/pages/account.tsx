import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import UpdateUserDataForm from "@/features/authentication/updateUserDataForm";

function Account() {
    return (
        <Section>
            <Container className="flex flex-col gap-4">
                <div>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Update your account</h1>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-5">
                    <UpdateUserDataForm />
                    <UpdateUserDataForm />
                </div>
            </Container>
        </Section>
    );
}

export default Account;