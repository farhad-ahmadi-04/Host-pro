import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useEffect, useState } from "react";

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
  overflow: hidden;

  @media (max-width: 800px) {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    /* .sidebar {
      position: fixed;
      display: block;
      z-index: 99;
    } */
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  grid-area: main;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function AppLayout() {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsShow(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <StyleAppLayout>
      <Header setIsShow={setIsShow} />
      <Sidebar setIsShow={setIsShow} isShow={isShow} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyleAppLayout>
  );
}
