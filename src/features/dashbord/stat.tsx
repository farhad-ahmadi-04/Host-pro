import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

function Stat({ title, value, icon, loading }:
    { title: string, value: string, icon: JSX.Element, loading: boolean }) {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_auto] items-center">
                <CardTitle className="text-muted-foreground">{title.toLocaleUpperCase()}</CardTitle>
                <CardDescription>{icon}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? <Skeleton className="w-full h-8" /> :
                    <p className="text-2xl font-semibold">{value}</p>}
            </CardContent>
        </Card>
    );
}

export default Stat;