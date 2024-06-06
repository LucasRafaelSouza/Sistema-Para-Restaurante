import {React,useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import HeaderComponent from '../../Components/HeaderComponent';
import { loginValidationSchema } from './LoginFormValidation';
import { DivForm,DivInput,StylizedInput,StylizedButton,StylizedSelect } from './StyleLoginForm';
import { useAuth } from "../../Hooks/UseAuth";


function LoginForm() {
    const [userLogin, setUserLogin] = useState(false);
    const [userLoginError, setUserLoginError] = useState(false);
    const [customError, setCustomError] = useState("");
    const  {login}  = useAuth();

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(loginValidationSchema)
    }
    );
    
    const onSubmit = (data) => {
        setUserLogin(false);
        const formData = {
            _id: data.email,
            password: data.password,
            role:""
          };
          console.log(formData);
        
        axios.post(
            'http://localhost:5282/api/User/authentication',
            formData)
                            .then(async res => {
                                console.log(res.data);

                                if (res.status === 200){  
                                    console.log(res.data)                     
                                    setUserLogin(true);
                                    await login(res.data);
                                                                   }
                                
                            })
                            .catch(err => {
                                if(err.response.status == 404){
                                    setCustomError("O usuário com o email digitado não foi encontrado.")
                                    
                                }
                                if(err.response.status == 401){
                                    setCustomError("Senha incorreta.")
                                    
                                }
                                console.log(err.response.status);
                                setUserLoginError(true);
                            })

    }
    const handleInputChange = () => {
        setUserLogin(false);
        setUserLoginError(false); 
        setCustomError("");
    };
    return (
        <div>
        <HeaderComponent/>       
        <DivForm>
       <form onSubmit={handleSubmit(onSubmit)}>
       <DivInput onChange={handleInputChange}>
           
               <StylizedInput type="text" onChange={handleInputChange} name="email" id="email" placeholder='Email'
               {...register('email')}/>
           <div>{errors.email?.message}</div>
       </DivInput>

       <DivInput onChange={handleInputChange}>
           
               <StylizedInput type="text" name="password" id="password" placeholder='Senha'  
               {...register('password')}/>
               <div>{errors.password?.message}</div>
       </DivInput>

        <StylizedButton type='submit'>Criar</StylizedButton>
        <div>{userLogin && (
           <p>Login realizado com sucesso!</p>
       )}</div>
       <div>{userLoginError && (
           <p>Erro ao realizar login. {customError}</p>
       )}</div>
        </form>
       </DivForm>
        </div>
    );
}
  
  export default LoginForm;