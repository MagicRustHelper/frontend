export interface IBanRow {
    avatar?: string
    nickname: string
    steamid: string
    serverNumber?: number
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