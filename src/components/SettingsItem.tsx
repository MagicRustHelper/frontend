import { KeyboardEvent, useState } from "react"

interface SettingsItemsProps {
    viewName: string
    settingItems: string[]
    setSettingItems: (value: string[]) => void
}

export function SettingsItem(props: SettingsItemsProps) {
    const [inputText, setInputText] = useState<string>('')


    const deleteItem = ((delete_value: string) => {
        if (props.setSettingItems !== null) {
            console.log(delete_value)
            props.setSettingItems(props.settingItems.filter(item => item !== delete_value))
        }
    })

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (props.settingItems !== null && props.settingItems.indexOf(inputText) === -1) {
                props.setSettingItems([...props.settingItems, inputText])
                setInputText('')
            }
        }
    }

    return (
        <>
            <h1>{props.viewName}</h1>
            <div className='settings-wrap'>
                {props.settingItems.map(item => <span className="item" onClick={() => deleteItem(item)} key={item} >{item}</span>)}
            </div>
            <div className="center"><input className="settings-input" type="text" placeholder="Словечко" value={inputText} onKeyDown={handleKeyDown} onChange={(e) => { setInputText(e.target.value) }} /></div>
        </>
    )
}