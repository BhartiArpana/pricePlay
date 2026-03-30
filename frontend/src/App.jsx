import { RouterProvider } from "react-router-dom"
import { router } from "./App.routes.jsx"
import { ProductProvider } from "./features/products/product.context.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"

function App() {


  return (
  <ProductProvider>
    <AuthProvider>
          <RouterProvider router={router} />
    </AuthProvider>
   </ProductProvider>
   
  )
}

export default App
