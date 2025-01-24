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

  @media (max-width: 800px) {
    padding: 1.2rem 1.8rem;
  }
`;

const StyledNavMenu = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default function Header() {
  return (
    <StyleHeader>
      <StyledNavMenu>
        <UserAvatar />
        <HeaderMenu />
      </StyledNavMenu>
    </StyleHeader>
  );
}
