import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from './pages/ProfilePages';
import { BanPage } from './pages/BanPage';
import { AuthPage, AuthVKPage } from './pages/AuthPages';
import { PrivateRoute } from './components/PrivateRoute';


function App() {

  return (
    <Routes>
      <Route path="/bans" element={<PrivateRoute><BanPage /> </PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /> </PrivateRoute>} />
      <Route path="/auth" element={<AuthPage></AuthPage>} />
      <Route path="/auth/vk" element={<AuthVKPage></AuthVKPage>} />
    </Routes>
  )
}

export default App;
