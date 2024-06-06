import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginForm from '../Pages/LoginForm/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Hooks/UseAuth';

jest.mock('axios');

describe('LoginFormRendering', () => {
  it('Testa a renderização dos elementos da página LoginForm', () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    expect(screen.getByText('Criar')).toBeInTheDocument();
  });

  it('Testa a submissão do formulário com resposta de sucesso', async () => {
    axios.post.mockResolvedValue({ status: 200, data: { email: 'teste@teste.com' } });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('Login realizado com sucesso!')).toBeInTheDocument();
    });
  });

  it('Testa a submissão do formulário com resposta de erro', async () => {
    axios.post.mockRejectedValue({ response: { status: 404 } });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'erro@erro.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao realizar login. O usuário com o email digitado não foi encontrado.')).toBeInTheDocument();
    });
  });

  it('Testa a Submissão do formulário com senha incorreta', async () => {
    axios.post.mockRejectedValue({ response: { status: 401 } });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao realizar login. Senha incorreta.')).toBeInTheDocument();
    });
  });

  it('Testa a submissão do formulário com email inexistente', async () => {
    axios.post.mockRejectedValue({ response: { status: 404 } });

    render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Criar'));

    await waitFor(() => {
      expect(screen.getByText(/O usuário com o email digitado não foi encontrado./)).toBeInTheDocument();
    });
  });
});