import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column */
  }
`;

// const StyledActivityChart = styled.div`
//   grid-column: span 2 / span 2;
//   grid-row-start: 2;
//   gap: 2.4rem;
// `;

export default function DashboardLayout() {
  const { bookings, isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins}
        loading={isLoading1 || isLoading2 || isLoading3}
      />
      {/* <StyledActivityChart> */}
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      {/* </StyledActivityChart> */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
