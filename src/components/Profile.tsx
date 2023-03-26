import { useEffect, useState } from "react"
import { Modal } from "./Modals/Modal"
import { SettingsItem } from "./SettingsItem"
import { profileApi } from "../services/api"
import { useToken } from "../hooks/getToken"
import { IProfileSettings } from "../interfaces/profile"

export function Profile() {
    const token = useToken()
    const [modalActive, setModalActive] = useState(false)
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

    return (<>
        {settings && <div className="container main">
            <h1 className='page-name'>Настройки</h1>
            <div className='profile'>
                Количество дней, когда считать, что аккаунт новый<br />
                <input type='number' value={plyaerNewInput} onChange={(e) => { setPlayerNewInput(parseInt(e.target.value)) }} />
                <button className='settings-button' onClick={() => activeSettingModal('include_reasons', 'Причины банов, которые показывать')} >Причины банов, которые показывать</button>
                <button className='settings-button' onClick={() => activeSettingModal('exclude_reasons', 'Причины банов, которые не показывать')}>Причины банов, которые не показывать</button>
                <button className='settings-button' onClick={() => activeSettingModal('exclude_servers', 'Сервера, которые не показывать')}>Сервера, которые не показывать</button>
                <button className='settings-submit' onClick={() => setIsSettingsChanged(true)} >Сохранить</button>
            </div>
        </div>}
        <Modal active={modalActive} setActive={setModalActive}>
            {settings && < SettingsItem key={changingSettingName} setSettingItems={setSettingItems} settingItems={settingItems} viewName={viewName}></SettingsItem>}

        </Modal >
    </>
    )
}