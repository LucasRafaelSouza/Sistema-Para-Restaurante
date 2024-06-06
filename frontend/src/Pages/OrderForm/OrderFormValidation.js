import * as Yup from 'yup';

export const orderValidationSchema = Yup.object({
    dishName: Yup.string().required('O nome do prato é obrigatório.'),
    clientName: Yup.string().matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'O nome do cliente deve conter apenas letras.').required('O nome do cliente é obrigatório.'),
    TableNumber: Yup.number().integer().min(1,'O número da mesa deve ser igual ou maior a 1.').typeError('você deve colocar o número da mesa'),
    DrinkQuantity: Yup.number().integer().min(1,'O número da bebidas deve ser igual ou maior a 1.').typeError('você deve colocar o número de bebidas'),
    DrinkName:Yup.string().required('O nome da bebida é obrigatório.')
    //nome do cliente não pode ter número
})