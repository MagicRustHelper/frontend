import { useEffect, useState } from "react"
import { profileApi } from "../services/api"
import { getBearerToken, getProfileSettings, setProfileSettings } from "../utils/localStorage"
import { IProfileSettings } from "../interfaces/profile"
import { toast } from 'react-toastify'

export function useSettings(setModalActive: React.Dispatch<React.SetStateAction<boolean>>) {
    const token = getBearerToken()
    const [viewName, setViewName] = useState<string>('')

    const [settings, setSettings] = useState<IProfileSettings>(getProfileSettings)
    const [changingSettingName, setChangingSettingName] = useState<string>('')
    const [settingItems, setSettingItems] = useState<string[]>([])

    const [isSettingsChanged, setIsSettingsChanged] = useState(false)
    const [playerNewInput, setPlayerNewInput] = useState<number>(settings.player_is_new)

    async function updateSettings() {
        setProfileSettings(settings)
        await toast.promise(
            profileApi.putSettings(settings, token), {
            pending: 'Настройки сохраняются',
            success: 'Настройки обновлены!👌',
            error: 'Не удалось обновить настройки'
        }
        );
    }

    function activeSettingModal(name: string, viewName: string) {
        setViewName(viewName)
        setChangingSettingName(name)
        setModalActive(true)
        const setting = settings.getAttribute(name)
        if (setting !== null) {
            setSettingItems(setting)
        }
    }

    useEffect(() => {
        if (isSettingsChanged && settings !== null) {
            settings.player_is_new = playerNewInput
            updateSettings()
            setIsSettingsChanged(false)
        }
    }, [isSettingsChanged])

    useEffect(() => {
        if (settings !== null) {
            settings.setAttribute(changingSettingName, settingItems)
        }

    }, [settingItems])
    return { playerNewInput, setPlayerNewInput, settings, changingSettingName, settingItems, viewName, setSettingItems, activeSettingModal, setIsSettingsChanged }
}