import { useEffect, useState } from "react"
import { Modal } from "../components/Modals/Modal"
import { SettingsItem } from "../components/SettingsItem"
import { profileApi } from "../services/api"
import { useToken } from "../hooks/getToken"
import { IProfileSettings } from "../interfaces/profile"

export function useSettings(setModalActive: React.Dispatch<React.SetStateAction<boolean>>) {
    const token = useToken()
    const [viewName, setViewName] = useState<string>('')

    const [settings, setSettings] = useState<IProfileSettings | null>(null)
    const [changingSettingName, setChangingSettingName] = useState<string>('')
    const [settingItems, setSettingItems] = useState<string[]>([])

    const [isSettingsChanged, setIsSettingsChanged] = useState(false)
    const [plyaerNewInput, setPlayerNewInput] = useState<number>(0)

    async function loadSettings() {
        const settings = await profileApi.getSettings(token)
        setSettings(settings);
        setPlayerNewInput(settings.player_is_new)
    }

    async function updateSettings() {
        console.log('in update');
        console.log(settings !== undefined)
        console.log('save', settings)
        if (settings !== null) {
            await profileApi.putSettings(settings, token);
        }
    }

    function activeSettingModal(name: string, viewName: string) {
        if (settings !== null) {
            setViewName(viewName)
            setChangingSettingName(name)
            setModalActive(true)
            const setting = settings.getAttribute(name)
            if (setting !== null) {
                setSettingItems(setting)
            }
        }
    }

    useEffect(() => {
        loadSettings()
    }, [])

    useEffect(() => {
        if (isSettingsChanged && settings !== null) {
            settings.player_is_new = plyaerNewInput
            updateSettings()
            setIsSettingsChanged(false)
        }
    }, [isSettingsChanged])

    useEffect(() => {
        if (settings !== null) {
            settings.setAttribute(changingSettingName, settingItems)
        }

    }, [settingItems])
    return { plyaerNewInput, setPlayerNewInput, settings, changingSettingName, settingItems, viewName, setSettingItems, activeSettingModal, setIsSettingsChanged }
}