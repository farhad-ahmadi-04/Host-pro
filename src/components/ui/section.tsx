import { cn } from "@/lib/utils";
import React from "react";

function Section({ className, children }:
    { className?: string, children: React.ReactNode }) {
    return (
        <section className={cn("flex flex-col w-full", className)}>
            {children}
        </section>);
}

export default Section;