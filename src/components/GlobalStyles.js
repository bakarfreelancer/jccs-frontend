import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --accent: #F37933;
}
$primary: red;
/* GLOBAL THEME  */
.bg-accent{
    background-color: var(--accent);
}
.btn-accent{
    background-color: var(--accent);
    border-color: var(--accent);
}
`;
export default GlobalStyles;
