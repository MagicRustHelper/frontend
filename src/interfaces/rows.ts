export interface IBanRow {
    avatar?: string
    nickname: string
    steamid: string
    server_number?: number
    is_new_account?: boolean
    is_checked?: boolean
    bans: IBan[]
}

export interface IBan {
    server_name: string,
    days_left: number,
    active: boolean,
    reason: string,
    isShow?: boolean,
}