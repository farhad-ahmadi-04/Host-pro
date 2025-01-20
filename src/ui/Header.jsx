import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiBars3BottomLeft } from "react-icons/hi2";
import ButtonIcon from "../ui/ButtonIcon";

const StyleHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-1--);
  grid-area: header;

  display: flex;
  align-items: center;
  justify-content: end;
  > :first-of-type {
    display: none;
  }

  @media (max-width: 800px) {
    justify-content: space-between;
    > :first-of-type {
      display: block;
    }
  }
`;

const StyledNavMenu = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function Header({ setIsShow }) {
  return (
    <StyleHeader>
      <div>
        <ButtonIcon className="show" onClick={() => setIsShow(true)}>
          <HiBars3BottomLeft />
        </ButtonIcon>
      </div>
      <StyledNavMenu>
        <UserAvatar />
        <HeaderMenu />
      </StyledNavMenu>
    </StyleHeader>
  );
}
