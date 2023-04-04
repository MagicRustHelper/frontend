import 'styles/modal.css'

interface SettingsModalProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    children: any
}

export function Modal(props: SettingsModalProps) {
    const onClickHandler = (() => {
        props.setActive(false)
    })

    return (
        <>
            <div className={props.active ? 'modal active' : 'modal'} onClick={onClickHandler}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </>
    )
}