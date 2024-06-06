import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OrderForm from '../Pages/OrderForm/OrderForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Hooks/UseAuth';

jest.mock('axios');

describe('OrderFormRendering', () => {
  it('Teste de renderização dos elementos da página OrderForm', () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <OrderForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

   
    expect(screen.getByPlaceholderText('Nome do prato')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome do/a cliente')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Numero da mesa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome da bebida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('numero de bebidas')).toBeInTheDocument();

    expect(screen.getByText('Criar')).toBeInTheDocument();
    
  });

  it('Testa a sumissão do formulário com resposta de suceso', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <OrderForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    
    fireEvent.change(screen.getByPlaceholderText('Nome do prato'), { target: { value: 'Pizza' } });
    fireEvent.change(screen.getByPlaceholderText('Nome do/a cliente'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Numero da mesa'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Nome da bebida'), { target: { value: 'Coca-Cola' } });
    fireEvent.change(screen.getByPlaceholderText('numero de bebidas'), { target: { value: '2' } });

   
    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      
      expect(screen.getByText('Pedido criado com sucesso!')).toBeInTheDocument();
    });
  });

  it('Teste de submissão do formulário com o resultado de erro', async () => {
    axios.post.mockRejectedValue(new Error('Erro ao criar o pedido'));

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <OrderForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    
    fireEvent.change(screen.getByPlaceholderText('Nome do prato'), { target: { value: 'Pizza' } });
    fireEvent.change(screen.getByPlaceholderText('Nome do/a cliente'), { target: { value: 'Bruce W' } });
    fireEvent.change(screen.getByPlaceholderText('Numero da mesa'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Nome da bebida'), { target: { value: 'Coca-Cola' } });
    fireEvent.change(screen.getByPlaceholderText('numero de bebidas'), { target: { value: '2' } });

    
    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      
      expect(screen.getByText('Erro ao criar o pedido.')).toBeInTheDocument();
    });
  });
});