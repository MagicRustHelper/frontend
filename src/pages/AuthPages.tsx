import vk_black_logo from '../assets/vk_black_logo.png'
import { useSearchParams, Navigate } from 'react-router-dom'
import { authApi, profileApi } from '../services/api'
import '../styles/auth.css'
import { useEffect, useState } from 'react'
import { setAvatarUrl, setBearerToken, setProfileSettings } from '../utils/localStorage'

export function AuthPage() {
    return (
        <a href={`https://oauth.vk.com/oauth/authorize?client_id=51415660&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=offline`} className='auth-img'><img src={vk_black_logo} alt="" height='100' width='100' /></a>
    )
}

export function AuthVKPage() {
    const [searchParms] = useSearchParams();
    const [token, setToken] = useState<string>('');

    async function authViaVKAndSetConfig() {
        // @ts-ignore
        const authData = await authApi.vkAuth(searchParms.get('code'));
        const profileSettings = await profileApi.getSettings(authData.token)
        setToken(authData.token)
        setBearerToken(authData.token)
        setAvatarUrl(authData.avatarUrl)
        setProfileSettings(profileSettings)
    }

    useEffect(() => {
        authViaVKAndSetConfig()
    }, [token])


    if (token == '') {
        return <div></div>
    }
    else {
        return (
            <Navigate replace to={'/bans'} />
        )
    }
}