import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: span 4; /* Full row */
  overflow-x: auto;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 768px) {
    grid-column: span 2; /* Full row in 2-column layout */
  }
  @media (max-width: 480px) {
    grid-column: span 1; /* Stack all items vertically */
  }
`;

// const fakeData = [{ label: "Jan 09", totalSales: 480, extrasSales: 20 }];

export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

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

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as={"h2"}>Sales</Heading>
      <ResponsiveContainer height={300} width={"100%"} minWidth={380}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={"4"} />
          <Tooltip contentStyle={{ background: colors.background }} />
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"$"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit={"$"}
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extra Sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
