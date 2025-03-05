import { cn } from "@/lib/utils";
import React from "react";

function Section({ className, children }:
    { className?: string, children: React.ReactNode }) {
    return (
        <section className={cn("flex flex-col gap-2 md:gap-4 lg:gap-5 w-full", className)}>
            {children}
        </section>);
}

export default Section;