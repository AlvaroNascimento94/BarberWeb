import styled from "styled-components";

export const InputPassword = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;

 input {
    flex: 1;
    padding-right: 4.5rem; 
    background: var(--barber-400);
  }

  button {
    position: absolute;
    right: 0.5rem;
    background: white;
    color: var(--barber-400);
    width: 4rem;
    border-radius: 5px;
    height: 1.75rem;
  }

`;
