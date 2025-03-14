import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Payment } from "./cabinColumns";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea";
import useEditCabin from "./useEditCabin";

export interface ISubmit {
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: File
}

// set type of form fields by zod
const formSchema = z.object({
    name: z
        .string({
            required_error: "This field is required",
            invalid_type_error: "This field is required"
        })
        .min(2, "cabin name is required")
        .max(20, "cabin name is required"),
    maxCapacity: z
        .number({
            required_error: "This field is required",
            invalid_type_error: "This field is required"
        })
        .max(10, "cabin max capacity is required"),
    regularPrice: z
        .number({
            required_error: "This field is required",
            invalid_type_error: "This field is required"
        })
        .min(1, "Capacity should be at least 1"),
    discount: z
        .number({
            required_error: "This field is required",
            invalid_type_error: "This field is required"
        }),
    description: z
        .string({
            required_error: "This field is required",
            invalid_type_error: "This field is required"
        }),
    image: z
        .instanceof(File, { message: "File must be an image" })
        .refine((file) => file === null || (file instanceof File && file.size <= 2 * 1024 * 1024), {
            message: "File size must be less than 2MB",
        })
        .or(z.undefined())
}).refine((data) => data.discount <= data.regularPrice, {
    message: "Discount should be less than or equal to regular price",
    path: ["discount"],
});


/**
 * Renders a form for creating or editing a cabin.
 *
 * This component initializes a form with default values based on the provided cabin data.
 * If the cabin has an `id`, the form is pre-populated for editing (except for the image field, which is reset),
 * otherwise it is configured for creating a new cabin.
 *
 * The form includes the following fields:
 * - Cabin name
 * - Maximum capacity (number input)
 * - Regular price (number input)
 * - Discount (number input)
 * - Description (textarea)
 * - Cabin photo (file input)
 *
 * When submitted, the form outputs the captured data,
 * ensuring that the image value is either a new file or retains the existing cabin image's name.
 *
 * @param cabin - The cabin data used to populate the form. If `cabin.id` exists, the form is in edit mode.
 *
 * @returns The JSX element representing the cabin creation/edit form.
 */
function CreateCabinForm({ cabin }: { cabin: Payment }) {
    const { id: editId, ...editValue } = cabin
    const { editCabin, isEditing } = useEditCabin()
    const isEditSession = Boolean(editId)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditSession ? { ...editValue, image: undefined } : { image: undefined },
    })



    function onSubmit(data: ISubmit) {
        const image = !data.image ? editValue.image : data.image;
        if (isEditSession) {
            editCabin(
                {
                    newCabinData: {
                        ...data,
                        image,
                    },
                    id: editId,
                },
                {
                    onSuccess: () => {
                        form.reset();
                    },
                }
            );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                {/* cabin name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cabin name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Cabin name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* maximum capacity */}
                <FormField
                    name="maxCapacity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="md:text-nowrap">Maximum capacity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Maximum capacity"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? null : +e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Regular price */}
                <FormField
                    name="regularPrice"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="md:text-nowrap">Regular price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Regular price"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? null : +e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Discount */}
                <FormField
                    name="discount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="md:text-nowrap">Discount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Discount"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? null : +e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* description */}
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="md:text-nowrap">Description for website</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="description"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* image */}
                <FormField
                    name="image"
                    control={form.control}
                    render={({ field }) => {
                        const { onChange, ...restField } = field;
                        return (
                            <FormItem>
                                <FormLabel className="md:text-nowrap">Cabin photo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) { onChange(file ?? undefined) }
                                        }}
                                        {...restField}
                                        value={undefined}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <Button type="submit" disabled={isEditing}>Edit cabin</Button>
                <Button type="button" variant={"secondary"}>Cancel</Button>
            </form>
        </Form>
    );
}

export default CreateCabinForm;