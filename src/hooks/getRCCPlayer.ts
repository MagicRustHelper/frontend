import { useState, useEffect } from 'react'
import { RCCPlayer } from "../interfaces/rcc";
import { RCCApi } from '../services/api';
import { getBearerToken } from '../utils/localStorage';

export function useRCCPlayer(steamid: string) {
    const token = getBearerToken()
    const [rccPlayer, setRCCPlayer] = useState<RCCPlayer | null>(null)

    async function getRCCPlayer() {
        const response = await RCCApi.getRCCPlayer(steamid, token)
        setRCCPlayer(response)
    }

    useEffect(() => {
        getRCCPlayer()
    }, [steamid])

    return rccPlayer
}