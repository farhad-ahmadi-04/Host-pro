import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled`
    height: 100dvh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authentication user
  const { user, isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authentication user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}
