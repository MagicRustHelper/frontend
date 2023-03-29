import { baseSteamAvatar } from "../constants"
import { IProfileSettings } from "../interfaces/profile"

export function getBearerToken(): string {
    // @ts-ignore: If token is none user will replace to auth page
    return localStorage.getItem('token')
}

export function setBearerToken(token: string) {
    localStorage.setItem('token', token)
}

export function getAvatarUrl(): string {
    const avatarUrl = localStorage.getItem('avatarUrl')
    if (avatarUrl === null) {
        return baseSteamAvatar
    }
    return avatarUrl
}

export function setAvatarUrl(avatarUrl: string) {
    localStorage.setItem('avatarUrl', avatarUrl)
}

export function setProfileSettings(settings: IProfileSettings) {
    localStorage.setItem('settings', settings.toJson())
}

export function getProfileSettings(): IProfileSettings {
    const settings = localStorage.getItem('settings')
    if (settings) {
        return IProfileSettings.fromJson(settings)
    }
    throw new Error('Не удалось загрузить настройки профиля!')
}

export function getPlayerIsNew(): number {
    return getProfileSettings().player_is_new
}