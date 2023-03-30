export interface PlayerStats {
    name: string
    steamid: string
    kp_total: number
    d_player: number
    kp_head: number
    kd: number
    kp_arrow: number
    kp_shot: number
    kp_melee: number
    avatar: string
}

export interface Player {
    id: string
    ip: string
    nickname: string
    server: number
    firstjoin: number
    vk?: number
    stats?: PlayerStats
}