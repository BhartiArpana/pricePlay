import { RouterProvider } from "react-router-dom"
import { router } from "./App.routes.jsx"
import { ProductProvider } from "./features/products/product.context.jsx"

function App() {


  return (
  <ProductProvider>
      <RouterProvider router={router} />
   </ProductProvider>
   
  )
}

export default App
