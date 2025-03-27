import useUser from "@/features/authentication/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function AvatarAction() {
    const { currentUser } = useUser()
    const avatarFallBack = currentUser?.user_metadata.fullName.split(" ").map((n: string) => n[0]).join("")


    return (
        <Avatar>
            <AvatarImage src={currentUser?.user_metadata.avatar} />
            <AvatarFallback>{avatarFallBack}</AvatarFallback>
        </Avatar>
    );
}

export default AvatarAction;