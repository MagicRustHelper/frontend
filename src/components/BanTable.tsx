import '../styles/player_table.css'
import refresh_line from '../assets/refresh_line.png'
import { BanRow } from './PlayerRows/BanRow'
import { useBans } from '../hooks/getBanRowsTable'
import { useState, ChangeEvent } from 'react'
import { IBan, IBanRow } from '../interfaces/rows'
import { getProfileSettings } from '../utils/localStorage'
import { Modal } from './Modals/Modal'
import { PlayerModal } from './Modals/PlayerModal'
import { getSearchButtonClass } from '../utils/utils'


export function BanTable() {
    const filrtres = [filterByBanDays, filterByBanReason]

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalPlayerRow, setModalPlayerRow] = useState<IBanRow | null>(null)

    const [active, setActive] = useState<boolean>(true)
    const [checked, setChecked] = useState<boolean>(false)
    const [reasons, setReasons] = useState<boolean>(true)
    const [daysBanShow, setDaysBanShow] = useState<number>(60)

    const allBanRows: IBanRow[] = useBans()
    const settings = getProfileSettings()
    const changeDaysHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDaysBanShow(parseInt(event.target.value))
    }

    function filterByParams(element: IBanRow, index: number, array: IBanRow[]): boolean {
        for (let cur_filter of filrtres) {
            if (!(element.bans.filter(cur_filter).length > 0)) {
                return false
            }
        }
        // Ban active working like a switch
        return (element.bans.filter(filterByBanActive).length > 0)
    }

    function filterByBanDays(element: IBan, index: number, array: IBan[]): boolean {
        if (element.daysLeft <= daysBanShow) {
            return true;
        }
        element.isShow = false;
        return false;
    }

    function filterByBanReason(element: IBan): boolean {
        if (!reasons) { return true }
        for (let reason of settings.include_reasons) {
            const banLowerCase = element.reason.toLowerCase()
            if (element.active == active && banLowerCase.includes(reason) && !(settings.exclude_reasons.includes(banLowerCase))) {
                return true;
            }
        }
        element.isShow = false;
        return false;
    }

    function filterByChecked(element: IBan): boolean {
        return true;
    }

    function filterByBanActive(element: IBan): boolean {
        if (element.active == active) {
            element.isShow = true;
            return true;
        }
        element.isShow = false;
        return false;
    }

    return (
        <main>
            <div className='container main'>
                <div className='search'>
                    <div className='search-item'> <input type="number" name='' id='' placeholder='Кол-во дней с бана' value={daysBanShow} onChange={changeDaysHandler} /> </div>
                    <button className={getSearchButtonClass(checked)} onClick={() => setChecked(prev => !prev)}>Проверенные</button>
                    <button className={getSearchButtonClass(reasons)} onClick={() => setReasons(prev => !prev)}>Причины</button>
                    <button className={getSearchButtonClass(active)} onClick={() => setActive(prev => !prev)}>Активный бан</button>
                    <div className="search-item search-refresh"><img src={refresh_line} alt="" /></div>
                </div>
                <div className='player-rows'>
                    {allBanRows.filter(filterByParams).map(banRow => <BanRow playerRow={banRow} key={banRow.steamid} setModalActive={setModalActive} setModalPlayerRow={setModalPlayerRow} />)}
                </div>
                <Modal active={modalActive} setActive={setModalActive} >
                    {modalPlayerRow !== null && <PlayerModal playerRow={modalPlayerRow}></PlayerModal>}
                </Modal>
            </div>

        </main >
    );
}
