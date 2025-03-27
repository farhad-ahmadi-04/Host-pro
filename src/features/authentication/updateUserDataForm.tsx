import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useState } from "react";

function UpdateUserDataForm() {
    const { currentUser } = useUser()
    const { isUpdating, updateUser } = useUpdateUser()
    const [fullName, setFullName] = useState<string>(currentUser?.user_metadata.fullName)
    const [avatar, setAvatar] = useState<File | null>(null)

    const handleSubmit = () => {
        if (!fullName) return
        updateUser({ fullName, avatar }, {
            onSuccess: () => {
                setAvatar(null);
            }
        })

    }

    const handleCancel = () => {
        setAvatar(null);
        setFullName(currentUser?.user_metadata.fullName)

    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Update user data</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-3">
                    <div>
                        <Label className="mb-2">Email address</Label>
                        <Input
                            value={currentUser?.email}
                            disabled />
                    </div>

                    <div>
                        <Label className="mb-2">Full name</Label>
                        <Input
                            value={fullName}
                            type="text"
                            id="fullName"
                            onChange={(e) => setFullName(e.target.value)}
                            disabled={isUpdating}
                        />
                    </div>

                    <div>
                        <Label className="mb-2">Avatar image</Label>
                        <Input
                            className="w-fit cursor-pointer"
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={e => setAvatar(e.target.files?.[0] || null)}
                            disabled={isUpdating}
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    type="reset"
                    variant={"outline"}
                    disabled={isUpdating}
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating} onClick={() => handleSubmit()}>Update account</Button>

            </CardFooter>
        </Card>
    );
}

export default UpdateUserDataForm;