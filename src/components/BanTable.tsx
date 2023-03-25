import '../styles/player_table.css'
import refresh_line from '../assets/refresh_line.png'
import { BanRow } from './PlayerRows/BanRow'
import { useBans } from '../hooks/getBanRowsTable'
import { useRef, useState, ChangeEvent } from 'react'
import { IBan, IBanRow } from '../interfaces/rows'

export function BanTable() {
    const [active, setActive] = useState<boolean>(true)
    const [checked, setChecked] = useState<boolean>(false)
    const [reasons, setReasons] = useState<boolean>(false)
    const [daysBanShow, setDaysBanShow] = useState<number>(60)
    const allBanRows: IBanRow[] = useBans()

    const changeDaysHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDaysBanShow(parseInt(event.target.value))
    }

    function filterByParams(element: IBanRow, index: number, array: IBanRow[]): boolean {
        const banDaysFilter: boolean = (element.bans.filter(filterByBanDaysAndActive).length > 0)
        if (banDaysFilter == false) return false;
        return true;
    }

    function filterByBanDaysAndActive(element: IBan, index: number, array: IBan[]): boolean {
        return (element.days_left <= daysBanShow && element.active == active);
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
                    {allBanRows.filter(filterByParams).map(banRow => <BanRow playerRow={banRow} byActiveBan={active} key={banRow.steamid} />)}
                </div>
            </div>

        </main >
    );
}

function getSearchButtonClass(state: boolean): string {
    const btnStyleClass = state ? 'search-button-pressed' : ''
    return ['search-item search-button', btnStyleClass].join(' ');
}