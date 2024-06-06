import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("formato de Email inválido.").required('O email é obrigatório.'),
    password: Yup.string().required('A senha é obrigatório.'),

    
})