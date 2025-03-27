import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UpdateUserDataForm() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Update user data</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-3">
                    <div>
                        <Label className="mb-2">Email address</Label>
                        <Input disabled />
                    </div>

                    <div>
                        <Label className="mb-2">Full name</Label>
                        <Input
                            type="text"
                            id="fullName"
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Avatar image</Label>
                        <Input
                            className="w-fit cursor-pointer"
                            type="file"
                            id="avatar"
                            accept="image/*"
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    type="reset"
                    variant={"outline"}
                >
                    Cancel
                </Button>
                <Button>Update account</Button>

            </CardFooter>
        </Card>
    );
}

export default UpdateUserDataForm;