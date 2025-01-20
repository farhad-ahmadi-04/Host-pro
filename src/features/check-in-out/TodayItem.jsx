import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const UserName = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type={"green"}>Arriving</Tag>}
      {status === "checked-in" && <Tag type={"blue"}>Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.countryFlag}`} />
      <Guest>{guests.fullName}</Guest>

      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variations="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
