import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./button";
import { Github, LogOut, User } from "lucide-react";
import useLogout from "@/features/authentication/useLogout";
import AvatarAction from "../avatarAction";
import useUser from "@/features/authentication/useUser";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

function Header({ children }: { children: React.ReactNode }) {
    const { isLogout, logout } = useLogout()
    const { currentUser } = useUser()

    return (
        <header className="w-full flex justify-between items-center py-3 md:p-3 bg-sidebar border-b border-sidebar-border shadow-sm shadow-sidebar">
            <div>
                {children}
            </div>
            <div className="flex items-center md:gap-1">
                <div className="flex items-center gap-2">
                    <AvatarAction />
                    <span>{currentUser?.user_metadata.fullName}</span>
                </div>
                <Link to={'https://github.com/farhad-ahmadi-04/'} target="_blank">
                    <Button size={"icon"} variant={"ghost"}><Github /></Button>
                </Link>
                <Link to={'account'}>
                    <Button size={"icon"} variant={"ghost"}><User /></Button>
                </Link>
                <ModeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}><LogOut /></Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-md" side="top">
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter className="sm:justify-start">
                            <SheetClose asChild>
                                <Button disabled={isLogout}>Cancel</Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button
                                    disabled={isLogout}
                                    variant={"outline"}
                                    onClick={() => logout()}>Logout</Button>
                            </SheetClose>

                        </SheetFooter>
                    </SheetContent>
                </Sheet>

            </div>
        </header>
    );
}

export default Header;