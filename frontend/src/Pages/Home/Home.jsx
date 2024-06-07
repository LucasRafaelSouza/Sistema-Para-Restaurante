import HeaderComponent from '../../Components/HeaderComponent';
import {StyledMain,StyledLink,Sectionlinks,SyledSpan} from './StyleHome';
import { useAuth } from "../../Hooks/UseAuth";


function Home() {
  const { user } = useAuth();
  return (
    <div className="App">
    <HeaderComponent/>
    
  
    <StyledMain>
    
    <section>
    <h1>Gerenciador de Pedidos</h1>
    <p>Este projeto permite a criação, visualização e gerenciamento de pedidos feitos em um restaurante</p>
    </section>
    <Sectionlinks>
    {(!user)?<StyledLink to='/user-login' > <SyledSpan>Realizar Login</SyledSpan></StyledLink>:
      <StyledLink to='/view-orders' > <SyledSpan>Visualizar pedidos</SyledSpan></StyledLink>
    }

    <StyledLink to='/create-order' > <SyledSpan>Criar Pedido</SyledSpan></StyledLink>
    
    </Sectionlinks>
   </StyledMain>
 
    </div>
  );
}
 
export default Home;