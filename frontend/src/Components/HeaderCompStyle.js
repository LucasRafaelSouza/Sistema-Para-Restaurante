import styled from 'styled-components'
import {Link} from 'react-router-dom';




export const StyledHeader = styled.header`
padding: 0 2rem;
background: rgba(0,0,0,0.1);
`;

export const StyledNav = styled.nav`
width: 100%;
height: 60px;
max-width: 1200px;
margin: 0 auto;
display: flex;
  justify-content: space-between;
  align-items: center; 
`;

export const SyledSpan = styled.span`
color: rgb(81, 40, 105);
font-size: 1em;

max-width: 35px;
`

export const StyledLink  = styled(Link)`
color: aliceblue;
font-size: ${props => props.$titlle ? '1.2rem' : '1em'};
margin-right: 30px;
text-decoration: none;
color: rgb(81, 40, 105);
font-family: futura-pt;
border-radius: 5px;
box-shadow: inset 0 0 0 0 rgb(151, 40, 105,0.6);
transition: color .5s ease-in-out, box-shadow .5s ease-in-out;
 &:hover {
    color: ${props => !props.$titlle ? 'white':''};
    box-shadow: ${props => !props.$titlle ? 'inset 110px 0 0 0 rgb(151, 60, 105,0.6)':''};
  }
  #larger-font {
    font-size: 1.2rem;
  }
`;

export const StyledTittleDiv = styled.div`
    font-size: 1.2rem;
`;
