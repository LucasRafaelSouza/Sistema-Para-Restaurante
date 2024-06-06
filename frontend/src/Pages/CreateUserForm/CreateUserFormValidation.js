import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
    email: Yup.string().email("formato de Email inválido.").required('O email é obrigatório.'),
    password: Yup.string().required('A senha é obrigatório.'),
    role: Yup.string().required('A ocupação é obrgatória.'),

    
})