import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --primary: #6610F2;
    --secondary: #1A8FE3;
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
.icon-primary{
  fill: var(--primary);
}

/*
*Scroll Bar 
*/

::-webkit-scrollbar {
  width: .4rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #e5e5e5;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--accent); 
  border-radius: 10px
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
/* 
*Navigation 
*/

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
  >.DraftEditor-root{
    height: 62vh;
  }
}
.toolbar-class {
  border: 1px solid #ccc;
}
`;
export default GlobalStyles;

/*
 * X-Small             none  <576px
 *Small 	            sm 	  ≥576px
 *Medium              md 	  ≥768px
 *Large 	            lg 	  ≥992px
 *Extra large         xl 	  ≥1200px
 *Extra extra large 	xxl 	≥1400px
 */
