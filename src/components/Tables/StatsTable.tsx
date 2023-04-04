import { useState } from 'react'

import { getSearchButtonClass } from 'utils/utils';
import { useStatsRows } from 'hooks/getStatsRowsTable';

import { StatsRow } from 'components/PlayerRows/StatsRow';

import 'styles/player_table.css'
import { IStatRow } from 'interfaces/rows';
import { Modal } from 'components/Modals/Modal';
import { PlayerModal } from 'components/Modals/PlayerModal';

export function StatsTable() {
    const [onlyNewPlayers, setOnlyNewPlayers] = useState<boolean>(true)
    const [minKD, setMinKD] = useState<number>(1.0)

    const [modalPlayerRow, setModalPlayerRow] = useState<IStatRow | null>(null)
    const [modalActive, setModalActive] = useState<boolean>(false);


    const { statRows, setShowOldPlayers } = useStatsRows()

    function clickOnlyNewPlayerHandler() {
        setShowOldPlayers(prev => !prev);
        setOnlyNewPlayers(prev => !prev)
    }

    function changeMinKDHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setMinKD(parseFloat(event.target.value))
    }

    function filterByMinKD(value: IStatRow) {
        if (value.kd <= minKD) {
            return false;
        }
        return true;
    }

    return (
        <main>
            <div className='container main'>
                <div className='search'>
                    <div className='search-item'><input type="number" value={minKD} onChange={changeMinKDHandler} placeholder='Минимальное кд' /></div>
                    <button className={getSearchButtonClass(onlyNewPlayers)} onClick={clickOnlyNewPlayerHandler}>Новый игроки</button>
                </div>
                <div className='player-rows'>
                    {statRows.filter(filterByMinKD).sort(sortByKD).map((item) => <StatsRow playerRow={item} key={item.steamid} setModalActive={setModalActive} setModalPlayerRow={setModalPlayerRow} />)}
                </div>
                <Modal active={modalActive} setActive={setModalActive} >
                    {modalPlayerRow !== null && <PlayerModal playerRow={modalPlayerRow}></PlayerModal>}
                </Modal>
            </div>
        </main>
    )

}

function sortByKD(v1: IStatRow, v2: IStatRow) {
    if (v1.kd < v2.kd) {
        return 1
    }
    if (v1.kd > v2.kd) {
        return -1
    }
    return 0
}