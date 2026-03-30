import {createBrowserRouter} from 'react-router-dom'
import LandingPage from './features/products/pages/LandingPage'
import Products from './features/products/pages/Products'


export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage />
    },
    {
        path:'/products',
        element:<Products/>
    }
])