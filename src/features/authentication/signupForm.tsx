import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import useSignup from "./useSignup";

// const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

function SignupForm() {
    const { isSignup, signup } = useSignup()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (value: z.infer<typeof formSchema>) => {
        if (value.email && value.name && value.password) {
            signup({
                email: value.email,
                fullName: value.name,
                password: value.password,
            }, {
                onSuccess: () => form.reset({
                    email: "",
                    name: "",
                    password: "",
                    confirmPassword: "",
                })
            })

        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    disabled={isSignup}
                    render={({ field }) => (
                        <FormItem className="w-full md:grid grid-cols-4 items-center">
                            <FormLabel className="text-nowrap">Full name</FormLabel>
                            <div className="w-full col-span-3">
                                <FormControl>
                                    <Input
                                        placeholder="Full name..."
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )} />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="email"
                    disabled={isSignup}
                    render={({ field }) => (
                        <FormItem className="w-full md:grid md:grid-cols-4 items-center">
                            <FormLabel className="text-nowrap w-1/2">Email address</FormLabel>
                            <div className="w-full col-span-3">
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="test@example.com"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )} />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="password"
                    disabled={isSignup}
                    render={({ field }) => (
                        <FormItem className="w-full md:grid md:grid-cols-4 items-center">
                            <FormLabel className="text-nowrap w-1/2">Password </FormLabel>
                            <div className="w-full col-span-3">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password..."
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )} />
                <Separator className="my-5" />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    disabled={isSignup}
                    render={({ field }) => (
                        <FormItem className="w-full md:grid md:grid-cols-4 items-center">
                            <FormLabel className="text-nowrap w-1/2">Confirm password </FormLabel>
                            <div className="w-full col-span-3">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="confirm Password..."
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )} />

                <div className="flex flex-col gap-3 md:flex-row-reverse">
                    <Button disabled={isSignup} type="submit">Create new user</Button>
                    <Button disabled={isSignup} type="reset" onClick={() => form.reset({
                        email: "",
                        name: "",
                        password: "",
                        confirmPassword: "",
                    })} variant={"outline"}>cancel</Button>
                </div>
            </form>
        </Form>
    );
}

export default SignupForm;