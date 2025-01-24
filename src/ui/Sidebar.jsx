import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import Heading from "./Heading";
import { useEffect, useRef, useState } from "react";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";

const StyleSidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--color-grey-0);
  padding: 3.2rem 1.4rem;
  border-right: 1px solid var(--color-grey-100);

  position: sticky;
  top: 0;
  /* grid-row: 1 / -1; */

  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  .rotated {
    transform: rotate(180deg);
  }

  &.active {
    width: 50px;
    h2 {
      display: none;
    }
  }

  @media (max-width: 800px) {
    height: 40px;
    width: 100%;
    position: fixed;
    top: unset;
    bottom: 0;
    padding: 0 1.8rem;
    z-index: 99;
  }
`;

const StyleSideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  margin-top: 1rem;
  color: var(--color-grey-500);
  max-width: 100%;

  .close {
    cursor: pointer;
    font-size: 2rem;
    flex-grow: 0;
    transition: all 0.3s ease;
    height: fit-content;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const sidebarRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      sidebarRef.current.classList.add("active");
      closeRef.current.firstElementChild.classList.add("rotated");
    } else {
      sidebarRef.current.classList.remove("active");
      closeRef.current.firstElementChild.classList.remove("rotated");
    }

    function handleResize() {
      if (window.innerWidth <= 800) {
        sidebarRef.current.classList.remove("active");
        closeRef.current.firstElementChild.classList.remove("rotated");
        setIsActive(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive]);

  function handleSideBar() {
    setIsActive(!isActive);
  }

  return (
    <StyleSidebar className="sidebar" ref={sidebarRef}>
      <StyleSideHeader>
        <Heading as={"h2"}>Host Pro</Heading>
        <div ref={closeRef} onClick={() => handleSideBar()}>
          <HiMiniChevronDoubleLeft className="close" />
        </div>
      </StyleSideHeader>
      <MainNav />

      {/* <Uploader /> */}
    </StyleSidebar>
  );
}
