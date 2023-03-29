import { useState } from "react"
import { Modal } from "./Modals/Modal"
import { SettingsModal } from "./Modals/SettingsModal"
import { useSettings } from "../hooks/useSettings"

export function Profile() {
    const [modalActive, setModalActive] = useState(false)
    const { playerNewInput, setPlayerNewInput, settings, changingSettingName, settingItems, viewName,
        setSettingItems, activeSettingModal, setIsSettingsChanged } = useSettings(setModalActive)


    return (<>
        {settings && <div className="container main">
            <h1 className='page-name'>Настройки</h1>
            <div className='profile'>
                Количество дней, когда считать, что аккаунт новый<br />
                <input type='number' value={playerNewInput} onChange={(e) => { setPlayerNewInput(parseInt(e.target.value)) }} />
                <button className='settings-button' onClick={() => activeSettingModal('include_reasons', 'Причины банов, которые показывать')} >Причины банов, которые показывать</button>
                <button className='settings-button' onClick={() => activeSettingModal('exclude_reasons', 'Причины банов, которые не показывать')}>Причины банов, которые не показывать</button>
                <button className='settings-button' onClick={() => activeSettingModal('exclude_servers', 'Сервера, которые не показывать')}>Сервера, которые не показывать</button>
                <button className='settings-submit' onClick={() => setIsSettingsChanged(true)} >Сохранить</button>
            </div>
        </div>}
        <Modal active={modalActive} setActive={setModalActive}>
            {settings && < SettingsModal key={changingSettingName} setSettingItems={setSettingItems} settingItems={settingItems} viewName={viewName}></SettingsModal>}

        </Modal >
    </>
    )
}