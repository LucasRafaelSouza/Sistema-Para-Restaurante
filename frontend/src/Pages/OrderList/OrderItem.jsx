import { useState } from 'react';
import axios from 'axios';
import {OrderItemDiv,StyledButton,StyledP,OrderItemHeaderDiv,TopLeftText,BottomLeftText,TopRightText} from './StyleOrderItem';
import { useAuth } from "../../Hooks/UseAuth";


function OrderItem(props){
    const { user } = useAuth();
    
    

    const [orderDeletedError, setOrderDeletedError] = useState(false);

    const deleteNote = () => {
        console.log(props.order._id);
        axios
            .delete(
"http://localhost:5282/api/Order/" + props.order._id)
            .then((res) => {
                if (res.status === 200) {
                    setOrderDeletedError(false);
                    window.location.reload();
                
                    
                    
                } 
               
            })
            .catch(
                (err) =>{console.log(err)
                    setOrderDeletedError(true);}
                    );
    }
;

    return(
    <OrderItemDiv>
    <div>{orderDeletedError && (
        <p>Erro ao deletar Pedido.</p>
    )}</div>

        <OrderItemHeaderDiv>
            <TopLeftText>Pedido: {props.index+1} </TopLeftText>
            <TopRightText>Cliente: {props.order.clientName}</TopRightText>
            <BottomLeftText>Mesa: {props.order.tableNumber}</BottomLeftText>
        </OrderItemHeaderDiv>
    
    <StyledP>
    

    {user?.role === "copa" && (
        <span>{props.order.drinkQuantity} x </span>
    )}
    {(user?.role === "cozinha")?props.order.dishName:props.order.drinkName}
    
    </StyledP>
     
    <StyledButton onClick={deleteNote}
    size="sm" variant="danger">
    X</StyledButton> 
    </OrderItemDiv>

    );
}


export default OrderItem;