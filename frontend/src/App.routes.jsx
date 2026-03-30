import {createBrowserRouter} from 'react-router-dom'
import LandingPage from './features/products/pages/LandingPage'
import Products from './features/products/pages/Products'
import NotFound from './shared/pages/NotFound'
import Login from './features/auth/pages/Login'
import Chat from './features/products/pages/Chat'
import Register from './features/auth/pages/Register'


export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage />
    },
    {
        path:'/products',
        element:<Products/>
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/chat',
        element:<Chat />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'*',
        element:<NotFound />
    }
])