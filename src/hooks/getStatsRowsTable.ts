import { useEffect, useState } from "react"
import { magicApi } from "../services/api"
import { Player, PlayerStats } from "../interfaces/magic"
import { IStatRow } from "../interfaces/rows"
import { getBearerToken, getPlayerIsNew } from "../utils/localStorage"
import { useOnlinePlayersList } from "./getOnlinePlayers"

export function useStatsRows() {
    const token = getBearerToken()
    const onlinePlayers = useOnlinePlayersList(token)
    const [steamidsWithStats, setSteamidsWithStats] = useState<string[]>(() => { return [] })
    const [statRows, setStatsRows] = useState<IStatRow[]>(() => { return [] })

    async function portionGetPlayerStats() {
        const size = onlinePlayers.length
        for (let i = 0; i < size; i += 100) {
            await fetchPlayerStats(onlinePlayers.slice(i, i + 100))
        }
    }

    async function fetchPlayerStats(players: Player[]) {
        const playersWithStats = await magicApi.fillPlayersStats(players, token);
        const newStatRows: IStatRow[] = []
        const newSteamids: string[] = []
        for (let player of playersWithStats) {
            if (player.stats?.steamid == undefined || steamidsWithStats.includes(player.id)) continue;
            const newStatRow = getNewStatRow(player)
            newStatRows.push(newStatRow)
            newSteamids.push(player.id)
        }
        setStatsRows((prevStatRows: IStatRow[]) => prevStatRows.concat(newStatRows))
        setSteamidsWithStats((prevSteamids: string[]) => prevSteamids.concat(newSteamids))
    }

    useEffect(() => {
        portionGetPlayerStats()
    }, [onlinePlayers])

    return statRows
}


function getNewStatRow(player: Player): IStatRow {
    return {
        'serverNumber': player.server,
        'avatar': player.stats?.avatar,
        'nickname': player.nickname,
        'steamid': player.id,
        'isNewAccount': true,
        'isChecked': false,
        'kills': player.stats?.kp_total,
        'kd': player.stats?.kd,
        'headshots': player.stats?.kp_head,
        'kill_shot': player.stats?.kp_shot,
        'kill_arrow': player.stats?.kp_arrow,
        'deaths': player.stats?.d_player,
    }
} 