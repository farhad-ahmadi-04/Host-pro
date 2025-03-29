import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX } from "react";

function Stat({ title, value, icon }:
    { title: string, value: string, icon: JSX.Element }) {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_auto] items-center">
                <CardTitle className="text-muted-foreground">{title.toLocaleUpperCase()}</CardTitle>
                <CardDescription>{icon}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
        </Card>
    );
}

export default Stat;