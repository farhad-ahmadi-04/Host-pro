import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBooking } from "../bookings/useBooking";
import CheckBox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";
import { useNavigate } from "react-router-dom";
import Empty from "../../ui/Empty";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckin } = useChecking();
  const { isError, settings, isLoading: isLoadingSetting } = useSettings();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;
  if (!booking) return <Empty />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (confirmPaid) {
      checkin(
        {
          bookingId,
          breakfast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          },
        },
        {
          onSuccess: () => navigate("/"),
        }
      );
    } else {
      checkin(
        { bookingId, breakfast: {} },
        {
          onSuccess: () => navigate("/"),
        }
      );
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id={"breakfast"}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid}
          value={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={"confirm"}
          disabled={confirmPaid || isCheckin}
        >
          I confirm that {guests.fullName} has paid the total mount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
