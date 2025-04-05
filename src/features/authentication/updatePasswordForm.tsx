import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useUpdateUser } from "./useUpdateUser";
import { JSX } from "react";


const formSchema = z.object({
    password: z.string().min(8),
    confirmedPassword: z.string()
}).refine(data => data.password === data.confirmedPassword, {
    message: "Passwords do not match",
    path: ["confirmedPassword"]
})

/**
 * Renders a form for updating the user's password.
 *
 * This component utilizes react-hook-form for form state management and integrates Zod for schema validation
 * via zodResolver. It renders fields for entering a new password and confirming it.
 *
 * On form submission, the updateUser function is invoked to update the user password. If the update operation
 * is successful, the form is reset to clear the input fields. The form fields and submission buttons are also
 * disabled during the update process to prevent concurrent modifications.
 *
 * @returns {JSX.Element} A card containing the update password form.
 */
function UpdatePasswordForm(): JSX.Element {
    const { isUpdating, updateUser } = useUpdateUser()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateUser({ password: values.password }, {
            onSuccess: () => {
                form.reset({
                    password: "",
                    confirmedPassword: ""
                })
            }
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Update password</CardTitle>
            </CardHeader>
            <Form {...form}>
                <CardContent className="h-full">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-6 h-full">
                        <div>

                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="mb-3">
                                        <FormLabel> New password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isUpdating}
                                                type="password"
                                                {...form.register("password", { required: true })}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="confirmedPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="mb-3">
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isUpdating}
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="items-center [.border-t]:pt-6 flex justify-between">
                            <Button disabled={isUpdating} type="reset" variant={"outline"}>Cancel</Button>
                            <Button disabled={isUpdating}>Update password</Button>
                        </div>
                    </form>
                </CardContent>
            </Form>
        </Card>
    );
}

export default UpdatePasswordForm;