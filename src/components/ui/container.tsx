import { cn } from "@/lib/utils";
import React from "react";

function Container({ className, children }: { className: string, children: React.ReactNode }) {
    return (
        <div className={cn("w-full max-w-[1400px]", className)}>
            {children}
        </div>
    );
}

export default Container;