import vk_black_logo from '../assets/vk_black_logo.png'
import { useSearchParams, Navigate } from 'react-router-dom'
import { authApi, profileApi } from '../services/api'
import '../styles/auth.css'
import { useEffect, useState } from 'react'

export function AuthPage() {
    return (
        <a href='https://oauth.vk.com/oauth/authorize?client_id=51415660&redirect_uri=http://127.0.0.1:3000/auth/vk&scope=offline' className='auth-img'><img src={vk_black_logo} alt="" height='100' width='100' /></a>
    )
}

export function AuthVKPage() {
    const [searchParms] = useSearchParams();
    const [token, setToken] = useState(null);

    async function authViaVKAndSetToken() {
        // @ts-ignore
        setToken((await authApi.vkAuth(searchParms.get('code'))).token);
    }

    useEffect(() => {
        authViaVKAndSetToken()
    }, [token])

    if (token == null) {
        return <div></div>
    }
    else {
        localStorage.setItem('token', token)
        return (
            <Navigate replace to={'/bans'} />
        )
    }
}