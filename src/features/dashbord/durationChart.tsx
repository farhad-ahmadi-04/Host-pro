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
        color: "var(--chart-1)",
    },
    {
        duration: "2 nights",
        value: 0,
        color: "var(--chart-2)",
    },
    {
        duration: "3 nights",
        value: 0,
        color: "var(--chart-3)",
    },
    {
        duration: "4-5 nights",
        value: 0,
        color: "var(--chart-4)",
    },
    {
        duration: "6-7 nights",
        value: 0,
        color: "var(--chart-5)",
    },
    {
        duration: "8-14 nights",
        value: 0,
        color: "var(--chart-6)",
    },
    {
        duration: "15-21 nights",
        value: 0,
        color: "var(--chart-7)",
    },
    {
        duration: "21+ nights",
        value: 0,
        color: "var(--chart-8)",
    },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    "1night": {
        label: "1 night",
        color: "var(--chart-1)",
    },
    "2 nights": {
        label: "2 nights",
        color: "var(--chart-2)",
    },
    "3 nights": {
        label: "3 nights",
        color: "var(--chart-3)",
    },
    "4-5 nights": {
        label: "4-5 nights",
        color: "var(--chart-4)",
    },
    "6-7 nights": {
        label: "6-7 nights",
        color: "var(--chart-5)",
    },
    "8-14 nights": {
        label: "8-14 nights",
        color: "var(--chart-6)",
    },
    "15-21 nights": {
        label: "15-21 nights",
        color: "var(--chart-7)",
    },
    "21+ nights": {
        label: "21+ nights",
        color: "var(--chart-8)",
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
