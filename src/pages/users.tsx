import Section from "@/components/ui/section";
import SignupForm from "@/features/authentication/signupForm";

function Users() {
    return (
        <Section>
            <div>
                <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">Create a new user</h1>
            </div>
            <div className="lg:w-8/12">
                <SignupForm />
            </div>
        </Section >
    );
}

export default Users;