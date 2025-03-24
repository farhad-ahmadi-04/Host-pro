import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";
import { Github, LogOut, User } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import useLogout from "@/features/authentication/useLogout";

function Header({ children }: { children: React.ReactNode }) {
    const { isLogout, logout } = useLogout()

    return (
        <header className="w-full flex justify-between items-center md:p-3 bg-sidebar border-b border-sidebar-border shadow-sm shadow-sidebar">
            <div>
                {children}
            </div>
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>user name</span>
                </div>
                <Link to={'https://github.com/farhad-ahmadi-04/'} target="_blank">
                    <Button size={"icon"} variant={"ghost"}><Github /></Button>
                </Link>
                <Link to={'account'}>
                    <Button size={"icon"} variant={"ghost"}><User /></Button>
                </Link>
                <ModeToggle />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}><LogOut /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button disabled={isLogout}>Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    disabled={isLogout}
                                    variant={"outline"}
                                    onClick={() => logout()}>Logout</Button>
                            </DialogClose>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </header>
    );
}

export default Header;