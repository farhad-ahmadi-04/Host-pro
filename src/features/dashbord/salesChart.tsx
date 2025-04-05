import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"
import { IBookingsState } from "@/types/bookingTypes"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "oklch(0.6 0.118 184.704)",
    },
    mobile: {
        label: "Mobile",
        color: "oklch(0.398 0.07 227.392)",
    },
} satisfies ChartConfig

function SalesChart({ bookings, numDays }: { numDays: number; bookings: IBookingsState[] }) {
    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
    });

    const data = allDates.map((date) => {
        return {
            label: format(date, "MMM dd"),
            totalSales: bookings
                ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
                ?.reduce((acc, cur) => acc + cur.totalPrice, 0),
            extrasSales: bookings
                ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
                ?.reduce((acc, cur) => acc + cur.extrasPrice, 0),
        };
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            unit={"$"}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            fillOpacity={0.4}
                            id="a"
                            dataKey={"totalSales"}
                            type={"monotone"}
                            stroke="var(--chart-1)"
                            fill="var(--chart-1)"
                            strokeWidth={2}
                            name="Total Sales"
                            unit={"$"}
                        />
                        <Area
                            fillOpacity={0.4}
                            id="b"
                            dataKey={"extrasSales"}
                            type={"monotone"}
                            stroke="var(--chart-2)"
                            fill="var(--chart-2)"
                            strokeWidth={2}
                            name="Extra Sales"
                            unit={"$"}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default SalesChart