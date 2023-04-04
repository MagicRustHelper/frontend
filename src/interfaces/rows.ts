export interface IBanRow {
    avatar?: string
    nickname: string
    steamid: string
    serverNumber: number
    isNewAccount?: boolean
    isChecked?: boolean
    bans: IBan[]
}

export interface IBan {
    serverName: string,
    daysLeft: number,
    active: boolean,
    reason: string,
    isShow?: boolean,
}

export interface IStatRow {
    avatar?: string
    nickname: string
    steamid: string
    serverNumber: number
    isNewAccount: boolean
    isChecked: boolean
    kills?: number
    kd: number
    headshots?: number
    kill_shot?: number
    kill_arrow?: number
    deaths?: number
}