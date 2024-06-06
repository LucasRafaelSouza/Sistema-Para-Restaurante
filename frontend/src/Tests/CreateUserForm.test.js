import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateUserForm from '../Pages/CreateUserForm/CreateUserForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Hooks/UseAuth';

jest.mock('axios');

describe('CreateUserFormRendering', () => {
  it('Testa a renderização da página CreateUserForm', () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <CreateUserForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('--Selecione sua ocupação no restaurante--')).toBeInTheDocument();

    expect(screen.getByText('Criar')).toBeInTheDocument();
  });

  it('Testa a submissão do formulário com resposta de sucesso', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <CreateUserForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId("role-test"), { target: { value: 'cozinha' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('Usuário criado com sucesso!')).toBeInTheDocument();
    });
  });
  
  it('Testa a submissão do formulário com erro de usuário já existente', async () => {
    axios.post.mockRejectedValue({ response: { status: 409 } });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <CreateUserForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'emailJaExistente@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId("role-test"), { target: { value: 'cozinha' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao criar usuário. O usuário com o email digitado já existe no sistema.')).toBeInTheDocument();
    });
  });

  it('Teste para validação de entrada nos formulários', async () => {
    

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <CreateUserForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    
    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('O email é obrigatório.')).toBeInTheDocument();
    });
    
  });
});