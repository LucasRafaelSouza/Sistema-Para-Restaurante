import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home';
import OrderForm from '../Pages/OrderForm/OrderForm';
import OrderList from '../Pages/OrderList/OrderList';
import CreateUserForm from '../Pages/CreateUserForm/CreateUserForm';
import LoginForm from '../Pages/LoginForm/LoginForm';
import { AuthProvider } from '../Hooks/UseAuth';
import PublicRoute from '../Pages/SecuredAndPublicRoutes/PublicRoute'
import SecuredRoute from '../Pages/SecuredAndPublicRoutes/SecuredRoute'

function Router() {
    return (
        <BrowserRouter>
        <AuthProvider>

            <Routes>
                <Route element={<Home />} path="/" exact />
                
                
                <Route element={<OrderForm />} path="/create-order" exact />
                
                
                <Route element={<SecuredRoute />}>
                <Route element={<OrderList />} path="/view-orders" exact />
                </Route>


                <Route element={<CreateUserForm />} path="/create-user" exact />

                <Route element={<PublicRoute />}>
                <Route element={<LoginForm />} path="/user-login" exact />
                </Route>

            </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
 
export default Router;