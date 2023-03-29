import { useEffect, useState } from "react"
import { RCCApi, steamApi } from "../services/api"
import { RCCPlayer } from "../interfaces/rcc"
import { IBan, IBanRow } from "../interfaces/rows"
import { Player } from "../interfaces/magic"
import { baseSteamAvatar } from "../constants"
import { getBearerToken, getPlayerIsNew } from "../utils/localStorage"
import { useOnlinePlayers } from "./getOnlinePlayers"


export function useBans() {
    const token = getBearerToken()
    const onlinePlayers = useOnlinePlayers(token)
    const [RCCPlayers, setRCCPlayers] = useState<RCCPlayer[]>(() => { return [] })
    const [banRows, setBanRows] = useState<IBanRow[]>(() => { return [] })



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
        setRCCPlayers((prevRCCPlayers: RCCPlayer[]) => prevRCCPlayers.concat(newRCCPlayers))
    }

    async function updateBanRows() {
        const newBanRows: IBanRow[] = await getNewBanRows(RCCPlayers, onlinePlayers, token)
        setBanRows(newBanRows)
    }

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
                'isNewAccount': isPlayerNew(player, getPlayerIsNew()),
                'isChecked': isPlayerChecked(RCCPlayer),
                'bans': getIBanList(RCCPlayer),
                'serverNumber': parseInt(player.server)

            }
        )
    }
    return newBanRows
}
function isPlayerNew(player: Player, days_while_new: number): boolean {
    const secnods_while_new = days_while_new * 86400
    if (Date.now() / 1000 - player.firstjoin >= secnods_while_new) return false;
    return true;
}

function getIBanList(rccPlayer: RCCPlayer): IBan[] {
    const bans: IBan[] = []
    if (rccPlayer.bans.length == 0) {
        return []
    }
    for (var ban of rccPlayer.bans) {
        bans.push(
            {
                'serverName': ban.serverName,
                'daysLeft': Math.floor(((Date.now() / 1000) - ban.banDate) / 86400),
                'active': ban.active,
                'reason': ban.reason
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

function isPlayerChecked(rccPlayer: RCCPlayer) {
    if (rccPlayer.bans.length == 0) return false;
    const lastBan = rccPlayer.bans.reduce((prev, cur) => prev.banDate > cur.banDate ? prev : cur)
    const allChecksAfterBan = rccPlayer.last_check.filter((value) => value.time > lastBan.banDate)
    for (let check of allChecksAfterBan) {
        console.log(check.serverName)
        if (check.serverName?.toLowerCase() == 'magicrust') return true
    }
    return false
}