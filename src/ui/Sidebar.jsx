import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiOutlineChevronDoubleLeft, HiOutlineXMark } from "react-icons/hi2";
import Uploader from "../data/Uploader";
import Heading from "./Heading";
import { useRef } from "react";

const StyleSidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--color-grey-0);
  padding: 3.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);
  width: 55px;
  position: sticky;
  top: 0;
  /* grid-row: 1 / -1; */

  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: width 0.3s ease;

  &:hover {
    width: fit-content;

    span {
      display: block;
    }

    h2 {
      display: block;
    }
  }

  @media (max-width: 800px) {
    padding: 0;
    width: 0; /* 0 width - change this with click */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    bottom: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  }
`;

const StyleSideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1rem;
  color: var(--color-grey-500);

  > h2 {
    display: none;
  }
  > svg {
    transform: rotate(180deg);
    transition: all 0.3s ease;
  }

  .hideSide {
    font-size: 20px;
  }

  .close {
    display: none;
  }

  @media (max-width: 800px) {
    .hideSide {
      display: none;
    }
    .close {
      display: block;
      font-size: 20px;
      cursor: pointer;
    }
    h2 {
      display: block;
    }
  }
`;

export default function Sidebar({ isShow, setIsShow }) {
  return (
    <StyleSidebar
      style={{
        display: isShow && "flex",
        width: isShow && " fit-content",
        padding: isShow && "10px 10px",
        transition: "width 0.5s ease-in-out",
      }}
    >
      <StyleSideHeader>
        <Heading as={"h2"}>Host Pro</Heading>
        <HiOutlineXMark className="close" onClick={() => setIsShow(false)} />
      </StyleSideHeader>
      <MainNav />

      {/* <Uploader /> */}
    </StyleSidebar>
  );
}
