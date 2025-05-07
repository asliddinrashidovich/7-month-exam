import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/main-layout'
import Homepage from './pages/home-page'
import NotFoundPage from './pages/not-found'
import ProductDetailsPage from './pages/product-details'
import ProductCard from './pages/product-card'
import Checkout from './pages/checkout'
import PropTypes from 'prop-types'
import ProfilePage from './pages/profile'
import { AccountDetails, Address, MyProducts, TrackOrder, Wishlist } from './components'
import BlogsPage from './pages/blog'
import BlogDetails from './components/blog/blog-details'

App.propTypes  = {
  children: PropTypes.node.isRequired
}
function App() {
  const isAuth = () => {
    return localStorage.getItem('token')
  }
  function ProtectedRoute({children}) {
    if(isAuth()) {
      return children
    } else {
      return <NotFoundPage/>
    }
  }
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="shop/:id" element={<ProductDetailsPage/>}/>
        <Route path="product-card" element={<ProductCard/>}/>
        <Route path="product-checkout" element={<Checkout/>}/>
        <Route path="posts" element={<BlogsPage/>}></Route>
        <Route path="posts/:id" element={<BlogDetails/>}/>
        <Route path="profile/" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><AccountDetails/></ProtectedRoute>}/>
          <Route path="my-products" element={<ProtectedRoute><MyProducts/></ProtectedRoute>}/>
          <Route path="address" element={<ProtectedRoute><Address/></ProtectedRoute>}/>
          <Route path="wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
          <Route path="track-order" element={<ProtectedRoute><TrackOrder/></ProtectedRoute>}/>
        </Route>
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