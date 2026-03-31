import {createBrowserRouter} from 'react-router-dom'
import LandingPage from './features/products/pages/LandingPage'
import Products from './features/products/pages/Products'
import NotFound from './shared/pages/NotFound'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Negotiation from './features/products/pages/Negotiation'
import Protected from './features/auth/components/Protected'


export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage />
    },
    {
        path:'/products',
        element:<Protected><Products /></Protected>
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/chat',
        element:<Protected><Negotiation /></Protected>
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