import { useEffect, useState } from "react"
import { magicApi } from "../services/api"
import { Player } from "../interfaces/magic"
import { IStatRow } from "../interfaces/rows"
import { getBearerToken, getPlayerIsNew } from "../utils/localStorage"
import { useOnlinePlayersList } from "./getOnlinePlayers"
import { toast } from "react-toastify"

export function useStatsRows() {
    const token = getBearerToken()
    const whilePlayerIsNew = getPlayerIsNew()

    const { onlinePlayers, setOnlinePlayers } = useOnlinePlayersList(token)
    const [onlineNewPlayers, setOnlineNewPlayers] = useState<Player[] | null>(null)
    const [onlineOldPlayers, setOnlineOldPlayers] = useState<Player[] | null>(null)
    const [showOldPlayers, setShowOldPlayers] = useState<boolean>(false)

    const [newPlayersRow, setNewPlayersRow] = useState<IStatRow[]>(() => { return [] })
    const [oldPlayersRow, setOldPlayersRow] = useState<IStatRow[]>(() => { return [] })

    const [statRows, setStatsRows] = useState<IStatRow[]>(() => { return [] })

    async function portionGetPlayerStats(players: Player[], isNewPlayers: boolean) {
        const size = players.length
        const notifyId = toast.loading('Загрузка статистики игроков..')
        for (let i = 0; i < size; i += 100) {
            await fetchPlayerStats(players.slice(i, i + 100), isNewPlayers)
            toast.update(
                notifyId, { progress: i / size }
            )
        }
        toast.update(notifyId,
            {
                render: 'Статистика загружена!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
                progress: 1,
            })
    }

    async function fetchPlayerStats(players: Player[], isNewPlayers: boolean) {
        const playersWithStats = await magicApi.fillPlayersStats(players, token);
        const newStatRows: IStatRow[] = []
        for (let player of playersWithStats) {
            if (player.stats?.kd == undefined) continue;
            const newStatRow = getNewStatRow(player, isNewPlayers)
            newStatRows.push(newStatRow)
        }
        if (isNewPlayers) { updateNewPlayersRows(newStatRows) }
        else { updateOldPlayersRows(newStatRows) }
    }

    function updateNewPlayersRows(newStatsRows: IStatRow[]) {
        setNewPlayersRow((prevStatRows: IStatRow[]) => prevStatRows.concat(newStatsRows))
        setStatsRows((prevStatRows: IStatRow[]) => prevStatRows.concat(newStatsRows))
    }

    function updateOldPlayersRows(newStatsRows: IStatRow[]) {
        setOldPlayersRow((prevStatRows: IStatRow[]) => prevStatRows.concat(newStatsRows))
        setStatsRows((prevStatRows: IStatRow[]) => prevStatRows.concat(newStatsRows))
    }
    useEffect(() => {
        if (onlinePlayers.length != 0) {
            setOnlineNewPlayers(onlinePlayers.filter(v => isPlayerNew(v.firstjoin, whilePlayerIsNew)))
            setOnlineOldPlayers(onlinePlayers.filter(v => !isPlayerNew(v.firstjoin, whilePlayerIsNew)))
            setOnlinePlayers([])
            console.log('clear')
        }
    }, [onlinePlayers])

    useEffect(() => {
        if (onlineNewPlayers) {
            portionGetPlayerStats(onlineNewPlayers, true)
            setOnlineNewPlayers(null)
            console.log('clear')
        }
    }, [onlineNewPlayers])

    useEffect(() => {
        if (showOldPlayers && onlineOldPlayers && oldPlayersRow.length == 0) {
            portionGetPlayerStats(onlineOldPlayers, false)
            setOnlineOldPlayers(null)
        }
    }, [showOldPlayers])

    useEffect(() => {
        if (showOldPlayers) {
            setStatsRows([...newPlayersRow, ...oldPlayersRow])
        }
        else {
            setStatsRows([...newPlayersRow])
        }
    }, [showOldPlayers, newPlayersRow, oldPlayersRow])

    return { statRows, setShowOldPlayers }
}


function getNewStatRow(player: Player, isPlayerNew: boolean): IStatRow {
    return {
        'serverNumber': player.server,
        'avatar': player.stats?.avatar,
        'nickname': player.nickname,
        'steamid': player.id,
        'isNewAccount': isPlayerNew,
        'isChecked': false,
        'kills': player.stats?.kp_total,
        'kd': player.stats?.kd || 0,
        'headshots': player.stats?.kp_head,
        'kill_shot': player.stats?.kp_shot,
        'kill_arrow': player.stats?.kp_arrow,
        'deaths': player.stats?.d_player,
    }
}

function isPlayerNew(firstJoin: number, daysWhileNew: number) {
    const secondsWhileNew = daysWhileNew * 86400
    if (Date.now() / 1000 - firstJoin <= secondsWhileNew) return true;
    return false;
}