import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";


interface IForm {
    email: string;
    password: string;
}


function LoginForm() {
    const form = useForm<IForm>()

    const onSubmit = (values: IForm) => {
        console.log(values);
        // Call your login API here
        // For now, we'll just simulate a success
        alert("Logged in successfully!");
        form.reset({
            email: "",
            password: "",
        });
    }

    return (
        <Section>
            <Container className="flex justify-center items-center h-dvh">
                <div className="flex  flex-col gap-10">
                    <div>
                        <h1 className="text-3xl font-semibold">Login in to your account</h1>
                        <Separator className="mt-5" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            {/* Form fields */}
                            <div>
                                <FormField
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="md:text-nowrap">Email address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    defaultValue={"host.pro@gmail.com"}
                                                    type="email"
                                                    placeholder="email address"
                                                    {...form.register("email", { required: true })}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="md:text-nowrap">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    defaultValue={"12345678"}
                                                    type="password"
                                                    placeholder="password"
                                                    {...form.register("password", { required: true, minLength: 8 })}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                </div>
            </Container>
        </Section>
    );
}

export default LoginForm;