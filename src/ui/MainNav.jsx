import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;

  @media (max-width: 800px) {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-items: center;
    overflow-x: scroll;
    grid-template-columns: repeat(auto-fill, 1fr);
  }
  @media (max-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  }
`;

const StyleNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    /* overflow: hidden; */
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 0 2.4rem 0;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    /* background-color: var(--color-grey-50); */
    /* border-radius: var(--border-radius-sm); */
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
    color: var(--color-grey-400);
  }

  &:hover svg,
  &:hover span,
  &:active svg,
  &:active span,
  &.active:link svg,
  &.active:link span,
  &.active:visited svg,
  &.active:visited span {
    color: var(--color-brand-600);
  }

  @media (max-width: 800px) {
    span {
      display: none;
    }
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyleNavLink to={"dashboard"}>
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to={"bookings"}>
            <HiOutlineCalendarDays />
            <span>bookings</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to={"cabins"}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to={"users"}>
            <HiOutlineUser />
            <span>Users</span>
          </StyleNavLink>
        </li>
        <li>
          <StyleNavLink to={"settings"}>
            <HiOutlineCog6Tooth />
            <span>Setting</span>
          </StyleNavLink>
        </li>
      </NavList>
    </nav>
  );
}
