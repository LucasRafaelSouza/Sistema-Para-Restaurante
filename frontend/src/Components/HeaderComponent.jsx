import {StyledLink,StyledHeader,StyledNav,StyledTittleDiv, SyledSpan} from './HeaderCompStyle'
import { useAuth } from "../Hooks/UseAuth";

function  HeaderComponent() {
    const { user } = useAuth();
    const { logout } = useAuth();
    console.log(user);
    
    const handleClick = () => {
        logout();
      };

    return (
        <StyledHeader>
        <StyledNav>
        <StyledTittleDiv>
            <StyledLink to='/' $titlle={true}> Gerenciador de Pedidos 
            </StyledLink>
        </StyledTittleDiv>
        
       
        
        <div>
        
        
       {user && (<StyledLink to='/view-orders'> Visualizar pedidos </StyledLink>)}

       {!user && (<StyledLink to='/user-login'> Login </StyledLink>)}

       {!user && (<StyledLink to='/create-order'> Realizar pedido </StyledLink>)}
       
       {user && (<StyledLink to='/' onClick={handleClick} > Logout </StyledLink>)}

       <StyledLink to='/create-user'>Criar Usuário</StyledLink>
       <StyledLink to='/create-order'>Criar Pedido</StyledLink>
            
       {user&&(<SyledSpan>Usuário logado: {user._id}</SyledSpan>)}
       
        </div>
        </StyledNav>
        </StyledHeader>
    );
  }
  
  export default HeaderComponent;