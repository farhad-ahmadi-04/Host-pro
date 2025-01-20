import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.div`
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <div>
        <Icon color={color}>{icon}</Icon>
      </div>
      <div>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </div>
    </StyledStat>
  );
}

export default Stat;
