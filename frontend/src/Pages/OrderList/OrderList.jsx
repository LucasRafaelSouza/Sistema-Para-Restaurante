import { useState, useEffect } from 'react';
//import NoteItem from './NoteItem';
import axios from 'axios';
import HeaderComponent from '../../Components/HeaderComponent';
import {StyledSection} from './StyleOrderList';
import OrderItem from './OrderItem';

function OrderList(){
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5282/api/Order')
            .then(({data}) => {
                console.log(data);
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    
    


    return(
            <div>
            <HeaderComponent/>
           <StyledSection>
           {orders.map((order, index) => (
            <OrderItem key={index} order={order} index={index} />
        ))}
           
            </StyledSection>
            </div>

    );

}

export default OrderList;