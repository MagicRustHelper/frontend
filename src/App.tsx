import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from './pages/ProfilePages';
import { BanPage } from './pages/BanPage';
import { AuthPage, AuthVKPage } from './pages/AuthPages';
import { PrivateRoute } from './components/PrivateRoute';
import { StatsSearchPage } from './pages/StatsSearchPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <ToastContainer
        position='top-right'
        theme='dark'
        autoClose={2000}
      />
      <Routes>
        <Route path="/bans" element={<PrivateRoute><BanPage /> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /> </PrivateRoute>} />
        <Route path='/stats' element={<PrivateRoute><StatsSearchPage /> </PrivateRoute>} > </Route>
        <Route path="/auth" element={<AuthPage></AuthPage>} />
        <Route path="/auth/vk" element={<AuthVKPage></AuthVKPage>} />
        <Route path='/' element={<PrivateRoute><BanPage /> </PrivateRoute>} > </Route>
      </Routes>
    </>
  )
}

export default App;
