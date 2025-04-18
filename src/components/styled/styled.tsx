import styled from "styled-components";

export const Card = styled.div`
  padding: 24px 28px;
  border-radius: 16px;
  background-color: white;
  box-shadow: var(--card-shadow);
  margin-bottom: 16px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #222;
  }
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  padding: 4px 0;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 12px;
  padding: 12px 24px;
  color: var(--tg-theme-button-text-color);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    opacity: 0.95;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #666;
  font-size: 0.95rem;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

export const Input = styled("input")`
  padding: 12px 20px;
  border-radius: 12px;
  width: 100%;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--tg-theme-button-color);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #333;
    border-color: #444;
    color: white;
    
    &::placeholder {
      color: #888;
    }
  }
`;
