import 'styles/player_table.css'
import refresh_line from 'assets/refresh_line.png'
import { BanRow } from 'components/PlayerRows/BanRow'
import { useBans } from 'hooks/getBanRowsTable'
import { useState, ChangeEvent } from 'react'
import { IBan, IBanRow } from 'interfaces/rows'
import { getProfileSettings } from 'utils/localStorage'
import { Modal } from 'components/Modals/Modal'
import { PlayerModal } from 'components/Modals/PlayerModal'
import { getSearchButtonClass } from 'utils/utils'


export function BanTable() {
    const filrtres = [filterByBanDays, filterByBanReason]

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalPlayerRow, setModalPlayerRow] = useState<IBanRow | null>(null)

    const [showActive, setShowActive] = useState<boolean>(true)
    const [showNotChecked, setShowNotChecked] = useState<boolean>(true)
    const [showReasons, setShowReasons] = useState<boolean>(true)
    const [daysBanShow, setDaysBanShow] = useState<number>(60)

    const allBanRows: IBanRow[] = useBans()
    const settings = getProfileSettings()
    const changeDaysHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDaysBanShow(parseInt(event.target.value))
    }

    function filterByParams(element: IBanRow, index: number, array: IBanRow[]): boolean {
        if (element.isChecked && showNotChecked) {
            return false;
        }

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
        if (!showReasons) { return true }
        for (let reason of settings.include_reasons) {
            const banLowerCase = element.reason.toLowerCase()
            if (element.active == showActive && banLowerCase.includes(reason) && !(settings.exclude_reasons.includes(banLowerCase))) {
                return true;
            }
        }
        element.isShow = false;
        return false;
    }

    function filterByBanActive(element: IBan): boolean {
        if (element.active == showActive) {
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
                    <div className='search-item'> <input type="number" placeholder='Кол-во дней с бана' value={daysBanShow} onChange={changeDaysHandler} /> </div>
                    <button className={getSearchButtonClass(showNotChecked)} onClick={() => setShowNotChecked(prev => !prev)}>Не проверенные</button>
                    <button className={getSearchButtonClass(showReasons)} onClick={() => setShowReasons(prev => !prev)}>Причины</button>
                    <button className={getSearchButtonClass(showActive)} onClick={() => setShowActive(prev => !prev)}>Активный бан</button>
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
