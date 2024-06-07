# Sitema-Para-Restaurante

Este sistema foi criado para a etapa de teste prática da empresa Rumo Soluções, e consiste de um programa que permite criar, visualizar e excluir pedidos de um restaurante.

### Premissas assumidas e decisões de projeto

Para a construção do sistema, foi decido separar sua estrutura em dois diretórios principais, frontend e backend. No frontend, foi adotada uma organização fixa dos arquivos em diretório, definida de acordo com a função que cada arquivo tem na aplicação. Em relação a conveções de nomenclatura, nomes de variável deveriam seguir o padrão camel Case, e nomes de classe deveriam seguir o padrão Pascal Case. Sobre as tecnologias utilizadas, o sistema utiliza ReactJs, Styled Componentes para a estilização dos componentes, Autoprefixer como pós-processador Css, o Jest interno do próprio React para testes, além de outras bibliotecas para auxiliar em funções específicas dos componentes, como Yup e React Router Dom, por exemplo.

O sistema permite que a criação de usuários, login com um dos usuários criados, criação de pedidos e visualização dos pedidos, sendo que os atributos mostrados na visualização dependem da função que o usuário logado tem no restaurante (copa/cozinha).

No backend, foi seguida uma organização similar dos arquivos em diretórios. Para o banco de dados utilizado, a escolha feita foi o MongoDB Atlas, gerenciado na Nuvem. Sobre as tecnologias empregadas, foi utilizado o ASP.NET core 8 para a construção geral, MongoDb Driver para conexão e mapeamento do banco de dados,xUnit para os testes, dentre outras bibliotecas auxiliares.

### Como Rodar

Frontend:

```
  cd frontend
```

```
  npm install
```

```
  npm start
```

Para rodar os testes:

```
  npm test
```

Backend

```
  cd RestaurantWebApi
```

```
  dotnet restore
```

```
  dotnet run --launch-profile http
```

Alternativamente, também é possível rodar a aplicação pelo Visual Studio, basta escolher o profile Http na parte superior da tela.

Para rodar os testes do Backend:

```
  cd RestaurantWebApiTest
```

```
  dotnet test
```

### Observações

- O Backend da aplicação está configurado para rodar na porta 5282, e o frontend está configurado para rodar na porta 3000.
- A aplicação utiliza o LocaStorage do navegador para salvar informações do login de usuário.
