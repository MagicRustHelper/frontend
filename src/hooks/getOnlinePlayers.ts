import { useEffect, useState } from "react"
import { magicApi } from "../services/api"
import { Player } from "../interfaces/magic"

export function useOnlinePlayersDict(token: string) {
    const [onlinePlayers, setOnlinePlayers] = useState<{ [key: string]: Player }>(() => { return {} })

    async function fetchOnlinePlayers() {
        const response = await magicApi.getOnlinePlayersDict(token)
        setOnlinePlayers(response)
    }

    useEffect(() => {
        fetchOnlinePlayers()
    }, [])

    return onlinePlayers
}

export function useOnlinePlayersList(token: string) {
    const [onlinePlayers, setOnlinePlayers] = useState<Player[]>(() => { return [] })

    async function fetchOnlinePlayers() {
        const response = await magicApi.getOnlinePlayers(token)
        setOnlinePlayers(response)
    }

    useEffect(() => {
        fetchOnlinePlayers()
    }, [])

    return { onlinePlayers, setOnlinePlayers }
}
