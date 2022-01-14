import styled, { css } from "styled-components"

/** Types */
const primary = css`
  color: var(--white);
  background-color: var(--purple-300);
`

/** Sizes */
const mid = css`
  width: 80px;
  height: 40px;
`

const big = css`
  width: 180px;
  height: 50px;
`

const sizes = { mid, big }

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 40px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  ${props =>
    props.primary
      ? primary
      : css`
          background-color: var(--white);
        `};
  ${props => (props.size ? sizes[props.size] : "")};
`

const Button = ({ children, ...props }) => (
  <ButtonStyle type="button" {...props}>
    {children}
  </ButtonStyle>
)

export default Button
