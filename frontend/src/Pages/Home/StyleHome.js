import styled from 'styled-components'
import {Link} from 'react-router-dom';


export const StyledMain = styled.main`
text-align: center;
color: rgb(81, 40, 105);
font-family: futura-pt;
font-size: 18px;

`;
export const Sectionlinks = styled.section`
display: flex;
justify-content: center;

`;
export const StyledLink  = styled(Link)`
position: relative;
background: transparent;
color: white;
text-decoration: none;
text-transform: uppercase;
padding: 10px 30px;
margin: 20px;
font-size: 1.2em;
font-weight:400 ;
letter-spacing: 0.1em;
transition: 0.4s;
&:hover {
    letter-spacing: 0.20em;
    background: #d89ff7;
    color: #d89ff7;
    box-shadow: 0 0 35px #d89ff7;
  }
&:before{
content: "";
position: absolute;
inset: 2px;
background: rgba(0,0,0,0.3);
  }
  width: 300px; 
  
`;

export const SyledSpan = styled.span`
position: relative;
z-index: 1;
`;


