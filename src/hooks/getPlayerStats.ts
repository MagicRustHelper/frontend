import { useState, useEffect } from 'react';
import { PlayerStats } from '../interfaces/magic';
import { magicApi } from '../services/api';
import { getBearerToken } from '../utils/localStorage';


export const usePlayerStats = (server: number, steamid: string): PlayerStats | null => {
    const token = getBearerToken()
    const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null)

    async function getPlayerStats() {
        const response = await magicApi.getPlayerStats(server, steamid, token)
        setPlayerStats(response)
    }

    useEffect(() => {
        getPlayerStats()
    }, [steamid]);

    return playerStats;
}

