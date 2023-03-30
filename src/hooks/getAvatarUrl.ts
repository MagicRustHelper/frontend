import { useState, useEffect } from 'react'
import { IAvatar } from '../interfaces/steam'
import { steamApi } from '../services/api'
import { getBearerToken } from '../utils/localStorage'

export function useSteamAvatarUrl(steamid: string) {
    const token = getBearerToken()
    const [avatars, setAvatars] = useState<IAvatar | null>(null)

    async function getAvatars() {
        const response = await steamApi.getAvatarUrl(steamid, token)
        setAvatars(response)
    }

    useEffect(() => {
        getAvatars()
    }, [steamid])

    return avatars
}