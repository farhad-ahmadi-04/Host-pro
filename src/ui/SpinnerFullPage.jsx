import styled from "styled-components";
import Spinner from "./Spinner";

const LoaderFullPage = styled.div`
  background-color: var(--color-grey-50);
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SpinnerFullPage() {
  return (
    <LoaderFullPage>
      <Spinner />
    </LoaderFullPage>
  );
}

export default SpinnerFullPage;
