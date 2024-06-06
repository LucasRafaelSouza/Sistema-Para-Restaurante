import {React,useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HeaderComponent from '../../Components/HeaderComponent';
import { orderValidationSchema } from './OrderFormValidation';
import { DivForm,DivInput,StylizedInput,StylizedButton } from './StyleOrderForm';


function OrderForm() {
    const [orderCreated, setOrderCreated] = useState(false);
    const [orderCreatedError, setOrderCreatedError] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(orderValidationSchema)
    }
    );
    
    const onSubmit = (data) => {
        setOrderCreated(false);
        const formData = {
            DishName: data.dishName,
            ClientName: data.clientName,
            TableNumber: data.TableNumber,
            DrinkQuantity: data.DrinkQuantity,
            DrinkName: data.DrinkName
          };
          console.log(formData);
        
        axios.post(
            'http://localhost:5282/api/Order',
            formData)
                            .then(res => {
                                if (res.status === 201){                       
                                    setOrderCreated(true);
                                }
                                
                            })
                            .catch(err => {console.log(err);
                                console.log(err);
                                setOrderCreatedError(true);
                            })

    }
    const handleInputChange = () => {
        setOrderCreated(false);
        setOrderCreatedError(false); 
    };
    return (
        <div>
        <HeaderComponent/>       
         <DivForm>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DivInput onChange={handleInputChange}>
            
                <StylizedInput type="text" onChange={handleInputChange} name="dishName" id="dishName" placeholder='Nome do prato'
                {...register('dishName')}/>
            <div>{errors.dishName?.message}</div>
        </DivInput>

        <DivInput onChange={handleInputChange}>
            
                <StylizedInput type="string" name="clientName" id="clientName" placeholder='Nome do/a cliente'  
                {...register('clientName')}/>
                <div>{errors.clientName?.message}</div>
        </DivInput>

        <DivInput onChange={handleInputChange}>
            
                <StylizedInput type="int" name="TableNumber" id="TableNumber" placeholder='Numero da mesa'  
                {...register('TableNumber')}/>
                <div>{errors.TableNumber?.message}</div>
        </DivInput>

        <DivInput onChange={handleInputChange}>
            
                <StylizedInput type="text" name="DrinkName" id="DrinkName" placeholder='Nome da bebida'  
                {...register('DrinkName')}/>
                <div>{errors.DrinkName?.message}</div>
        </DivInput>
        
        <DivInput onChange={handleInputChange}>
            
                <StylizedInput type="int" name="DrinkQuantity" id="DrinkQuantity" placeholder='numero de bebidas'  
                {...register('DrinkQuantity')}/>
                <div>{errors.DrinkQuantity?.message}</div>
        </DivInput>

         <StylizedButton type='submit'>Criar</StylizedButton>
         <div>{orderCreated && (
            <p>Pedido criado com sucesso!</p>
        )}</div>
        <div>{orderCreatedError && (
            <p>Erro ao criar o pedido.</p>
        )}</div>
         </form>
        </DivForm>
        </div>
    );
}
  
  export default OrderForm;