import { Cell, Legend, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { IBooking } from "@/types/bookingTypes"
import { IDurationChart } from "@/types/durationChart"

const startData = [
    {
        duration: "1 night",
        value: 0,
        color: "oklch(0.645 0.246 16.439)",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "#f97316",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "oklch(0.769 0.188 70.08)",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "oklch(0.627 0.265 303.9)",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "oklch(0.696 0.17 162.48)",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "#14b8a6",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "oklch(0.488 0.243 264.376)",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "#a855f7",
    },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig


function prepareData(startData: IDurationChart[], stays: IBooking[]) {
    // A bit ugly code, but sometimes this is what it takes when working with real data 😅

    function incArrayValue(arr: IDurationChart[], field: string) {
        return arr?.map((obj) =>
            obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    const data = stays
        ?.reduce((arr, cur) => {
            const num = cur.numNights;

            if (num === 1) return incArrayValue(arr, "1 night");
            if (num === 2) return incArrayValue(arr, "2 nights");
            if (num === 3) return incArrayValue(arr, "3 nights");
            if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
            if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
            if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
            if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
            if (num >= 21) return incArrayValue(arr, "21+ nights");
            return arr;
        }, startData)
        ?.filter((obj) => obj.value > 0);

    return data;
}

export function DurationChart({ confirmedStays }: { confirmedStays: IBooking[] }) {
    const data = prepareData(startData, confirmedStays)

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Stay duration summary</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="w-full mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={true}
                            content={
                                <ChartTooltipContent
                                    labelKey="value"
                                    nameKey="duration"
                                />
                            }
                        />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="duration"
                            innerRadius={40}
                            strokeWidth={3}
                        >
                            {data?.map((entry) => (
                                <Cell
                                    fill={entry.color}
                                    stroke={entry.color}
                                    key={entry.duration}
                                />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            width={100}
                            layout="vertical"
                            iconSize={15}
                            iconType="diamond"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
