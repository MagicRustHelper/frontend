import { useEffect, useState } from 'react'

import { getSearchButtonClass } from '../utils/utils';
import { useStatsRows } from '../hooks/getStatsRowsTable';

import { StatsRow } from './PlayerRows/StatsRow';

import '../styles/player_table.css'

export function StatsTable() {
    const [onlyNewPlayers, setOnlyNewPlayers] = useState<boolean>(false)

    const statRows = useStatsRows()


    return (
        <main>
            <div className='container main'>
                <div className='search'>
                    <div className='search-item'><input type="text" /></div>
                    <button className={getSearchButtonClass(onlyNewPlayers)} onClick={() => setOnlyNewPlayers(prev => !prev)}>Новый игроки</button>
                </div>
                <div className='player-rows'>
                    {statRows.map((item) => <StatsRow playerRow={item} />)}
                </div>
            </div>
        </main>
    )

}