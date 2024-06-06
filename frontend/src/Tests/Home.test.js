import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Pages/Home/Home';
import { BrowserRouter, } from 'react-router-dom'
import { AuthProvider } from '../Hooks/UseAuth';
import { useAuth } from '../Hooks/UseAuth';



describe('HomeRendering', () => {
  it('Testando a renderizacao dos elementos padrão da pagina Home', () => {
    const { debug, getByRole } = render(
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <Home/>
          </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
        
      
    );
    

    const projectTitle = screen.getAllByText('Gerenciador de Pedidos');
    expect(projectTitle.length).toEqual(2);

  
    expect(screen.getByText('Este projeto permite a criação, visualização e gerenciamento de pedidos feitos em um restaurante')).toBeInTheDocument();
    
    

  })}
);



