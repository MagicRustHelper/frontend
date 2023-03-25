import { useEffect, useState } from "react"
import { RCCApi, magicApi, steamApi } from "../services/api"
import { RCCPlayer } from "../interfaces/rcc"
import { IBan, IBanRow } from "../interfaces/rows"
import { Player } from "../interfaces/magic"
import { baseSteamAvatar } from "../constants"
import { useToken } from "./getToken"


export function useBans() {
    const [onlinePlayers, setOnlinePlayers] = useState<{ [key: string]: Player }>(() => { return {} })
    const [RCCPlayers, setRCCPlayers] = useState<RCCPlayer[]>(() => { return [] })
    const [banRows, setBanRows] = useState<IBanRow[]>(() => { return [] })
    const token = useToken()



    async function fetchOnlinePlayers() {
        const response = await magicApi.getOnlinePlayersDict(token)
        setOnlinePlayers(response)
    }

    async function PortionGetRCCPlayer() {
        const size: number = Object.keys(onlinePlayers).length
        for (let i = 0; i < size; i += 20) {
            await fetchRCCPlayers(Object.keys(onlinePlayers).slice(i, i + 20))
        }
    }

    async function fetchRCCPlayers(steamids: string[]) {
        const players = await RCCApi.getRCCPlayers(steamids, token)
        const newRCCPlayers: RCCPlayer[] = []
        for (var player of players) {
            if (player.status == "success") {
                newRCCPlayers.push(player);
            }
        }
        setRCCPlayers([...RCCPlayers, ...newRCCPlayers])
    }

    async function updateBanRows() {
        const newBanRows: IBanRow[] = await getNewBanRows(RCCPlayers, onlinePlayers, token)
        setBanRows([...banRows, ...newBanRows])
    }

    useEffect(() => {
        fetchOnlinePlayers()
    }, [])

    useEffect(() => {
        PortionGetRCCPlayer()
    }, [onlinePlayers])

    useEffect(() => {
        updateBanRows()
    }, [RCCPlayers])

    return banRows
}




async function getNewBanRows(RCCPlayers: RCCPlayer[], onlinePlayers: { [key: string]: Player }, token: string): Promise<IBanRow[]> {
    const newBanRows: IBanRow[] = []
    for (var RCCPlayer of RCCPlayers) {
        const player: Player = onlinePlayers[RCCPlayer.steamid]
        if (RCCPlayer.bans.length == 0) continue;
        newBanRows.push(
            {
                'avatar': await tryGetAvatar(RCCPlayer.steamid, token),
                'nickname': player.nickname,
                'steamid': RCCPlayer.steamid,
                'is_new_account': isPlayerNew(player, 7),
                'bans': getIBanList(RCCPlayer),
            }
        )
    }
    return newBanRows
}
function isPlayerNew(player: Player, days_while_new: number): boolean {
    const secnods_while_new = days_while_new * 86400
    if (Date.now() / 1000 - player.firstjoin >= secnods_while_new) return true;
    return false;
}

function getIBanList(rccPlayer: RCCPlayer): IBan[] {
    const bans: IBan[] = []
    if (rccPlayer.bans.length == 0) {
        return []
    }
    for (var ban of rccPlayer.bans) {
        bans.push(
            {
                'server_name': ban.serverName,
                'days_left': Math.floor(((Date.now() / 1000) - ban.banDate) / 84600),
                'active': ban.active
            }
        )
    }
    return bans
}

async function tryGetAvatar(steamid: string, token: string) {
    let avatarUrl: string;
    try {
        avatarUrl = (await steamApi.getAvatarUrl(steamid, token)).avatarUrl
    }
    catch (error) {
        avatarUrl = baseSteamAvatar;
    }
    return avatarUrl;
}