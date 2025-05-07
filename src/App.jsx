import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/main-layout'
import Homepage from './pages/home-page'
import NotFoundPage from './pages/not-found'
import ProductDetailsPage from './pages/product-details'

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="shop/:id" element={<ProductDetailsPage/>}/>
        {/* <Route path="blog" element={<BlogsPage/>}></Route> */}
        {/* <Route path="product-card" element={<ProductCard/>}/> */}
        {/* <Route path="product-checkout" element={<Checkout/>}/> */}
        {/* <Route path="blog/:id" element={<BlogDetails/>}/> */}
        {/* <Route path="shop/:category/:id" element={<ProductDetailsPage/>}/> */}
        {/* <Route path="profile/" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><AccountDetails/></ProtectedRoute>}/>
          <Route path="my-products" element={<ProtectedRoute><MyProducts/></ProtectedRoute>}/>
          <Route path="address" element={<ProtectedRoute><Address/></ProtectedRoute>}/>
          <Route path="wishlist" element={<Wishlist><Wishlist/></Wishlist>}/>
          <Route path="track-order" element={<ProtectedRoute><TrackOrder/></ProtectedRoute>}/>
        </Route> */}
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App