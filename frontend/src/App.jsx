import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home,Login,Signup,Logout,EditProfile,CustomerDashboard,ProviderDashboard,BrowseServices,CustomerLayout,ProviderLayout,CustomerBookings,ProviderProfile,
  CreateService,ProviderServices,ProviderRequests,Feedback,MyProfile,ProviderReviewPage}  from './index'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/edit-profile' element={<EditProfile />} />
      <Route path='/profile' element={<MyProfile />} />


      <Route path='/provider' element={<ProviderLayout />} >
        <Route index element={<ProviderDashboard />} />
        <Route path='create-service' element={<CreateService />} />
        <Route path='service' element={<ProviderServices />} />
        <Route path='booking-requests' element={<ProviderRequests />} />
        <Route path='reviews' element={<ProviderReviewPage />} />
      </Route>

      <Route path='/customer' element={<CustomerLayout />} >
        <Route index element={<CustomerDashboard />} />
        <Route path='browse-services' element={<BrowseServices />} />
        <Route path='my-bookings' element={<CustomerBookings />} />
        <Route path='provider-profile' element={<ProviderProfile />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

    </Routes>
  )
}

export default App
