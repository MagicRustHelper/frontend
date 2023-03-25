export enum RCCResponseStatus {
    'success',
    'error'
}

export interface RCCCheck {
    moderSteamID?: string
    time: number
    serverName?: string
}

export interface RCCBan {
    banID?: number
    reason: string
    serverName: string
    OVHserverID?: number
    banDate: number
    unbanDate?: number
    active: boolean
}

export interface RCCPlayer {
    status: string
    errorreason?: string
    steamid: string
    last_nick?: string
    rcc_checks?: number
    last_ip?: Array<string>
    last_check?: Array<RCCCheck>
    bans: RCCBan[]
    another_accs?: Array<number>
}