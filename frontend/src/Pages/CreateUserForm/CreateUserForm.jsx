import {React,useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HeaderComponent from '../../Components/HeaderComponent';
import { userValidationSchema } from './CreateUserFormValidation';
import { DivForm,DivInput,StylizedInput,StylizedButton,StylizedSelect,StylizedOption } from './StyleCreateUserForm';


function CreateUserForm() {
    const [userCreated, setUserCreated] = useState(false);
    const [userCreatedError, setUserCreatedError] = useState(false);
    const [customError, setCustomError] = useState("");

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(userValidationSchema)
    }
    );
    
    const onSubmit = (data) => {
        setUserCreated(false);
        const formData = {
            _id: data.email,
            role: data.role,
            password: data.password

          };
          console.log(formData);
        
        axios.post(
            'http://localhost:5282/api/User',
            formData)
                            .then(res => {
                                if (res.status === 201){                       
                                    setUserCreated(true);
                                }
                                
                            })
                            .catch(err => {
                                if(err.response.status === 409){
                                    setCustomError("O usuário com o email digitado já existe no sistema.")
                                    
                                }

                                console.log(err);
                                setUserCreatedError(true);
                            })

    }
    const handleInputChange = () => {
        setUserCreated(false);
        setUserCreatedError(false);
        setCustomError(""); 
    };
    return (
        <div>
        <HeaderComponent/>       
        <DivForm>
       <form onSubmit={handleSubmit(onSubmit)}>
       <DivInput onChange={handleInputChange}>
           
               <StylizedInput type="email" onChange={handleInputChange} name="email" id="email" placeholder='Email'
               {...register('email')}/>
           <div>{errors.email?.message}</div>
       </DivInput>

       <DivInput onChange={handleInputChange}>
           
               <StylizedInput type="string" name="password" id="password" placeholder='Senha'  
               {...register('password')}/>
               <div>{errors.password?.message}</div>
       </DivInput>

       <DivInput onChange={handleInputChange}>
           
               <StylizedSelect type="string" name="role" id="role" data-testid="role-test" 
               {...register('role')}>
                <StylizedOption value="">--Selecione sua ocupação no restaurante--</StylizedOption>
                    <StylizedOption value="copa">Copa</StylizedOption>
                    <StylizedOption value="cozinha">Cozinha</StylizedOption>
               </StylizedSelect>
               <div>{errors.role?.message}</div>
       </DivInput>
        <StylizedButton type='submit'>Criar</StylizedButton>
        <div>{userCreated && (
           <p>Usuário criado com sucesso!</p>
       )}</div>
       <div>{userCreatedError && (
           <p>Erro ao criar usuário. {customError}</p>
       )}</div>
        </form>
       </DivForm>
        </div>
    );
}
  
  export default CreateUserForm;