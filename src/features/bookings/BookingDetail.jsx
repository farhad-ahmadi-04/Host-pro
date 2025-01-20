import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, bookingId } = useBooking();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  const { status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            {" "}
            check in
          </Button>
        )}

        {status === "check-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkout(bookingId);
            }}
            disabled={isCheckingOut}
          >
            {" "}
            check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variations="danger" onClick={moveBack}>
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSuccess: () => navigate(-1),
                });
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
