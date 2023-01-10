import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --primary: #1A8FE3;
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

/* Navigation */
.current{
    color: var(--primary);
    svg, p{
        color: var(--primary);

    }
}

/* Post Editor  */
.wrapper-class {
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
.editor-class {
  background-color:#e5e5e5;
  height: 70vh;
  padding: 1rem;
  border: 1px solid #ccc;
}
.toolbar-class {
  border: 1px solid #ccc;
}
`;
export default GlobalStyles;
