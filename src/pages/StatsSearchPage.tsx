import { Header } from "../components/Header";
import { StatsTable } from "../components/StatsTable";

import '../styles/player_table.css'

export function StatsSearchPage() {
    return (
        <div><Header />
            <StatsTable></StatsTable>
        </div>
    )
}