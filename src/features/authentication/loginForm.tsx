import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { IUserLogin } from "@/types/authTypes";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";

function LoginForm() {
    const { isLogin, login } = useLogin()
    const form = useForm<IUserLogin>({
        defaultValues: {
            email: "host.pro@gmail.com",
            password: "12345678",
        }
    })

    const onSubmit = (values: IUserLogin) => {
        // Call your login API here
        login({ email: values.email, password: values.password },
            {
                onSuccess: () => {
                    form.reset({
                        email: "",
                        password: "",
                    });
                }
            }
        )
        // For now, we'll just simulate a success
    }

    return (
        <Section>
            <Container className="flex justify-center items-center h-dvh">
                <div className="flex  flex-col gap-10">
                    <div className="flex flex-col items-center">
                        <Logo className="mb-5" />
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
                                                    disabled={isLogin}
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
                                                    disabled={isLogin}
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


                            <Button disabled={isLogin} type="submit" className="w-full">Login</Button>
                        </form>
                    </Form>
                </div>
            </Container>
        </Section>
    );
}

export default LoginForm;