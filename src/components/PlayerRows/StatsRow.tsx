import { baseRCCPlayerURL } from "../../constants";
import { IStatRow } from "../../interfaces/rows";

interface StatsRowProps {
    playerRow: IStatRow
}

export function StatsRow(props: StatsRowProps) {
    const isNewAccount = props.playerRow.isNewAccount ? '👽' : '';
    const isChecked = props.playerRow.isChecked ? '🕶' : '';
    return (
        <div className="player-row">
            <div className="player-item player-server">{props.playerRow.serverNumber}</div>
            <img className="player-item player-img" src={props.playerRow.avatar} alt="" />
            <a href={baseRCCPlayerURL + props.playerRow.steamid} target="_blank" className='player-item player-nickname'>{props.playerRow.nickname}</a>
            <div className="player-item player-new">{isNewAccount}</div>
            <div className="player-item player-checked">{isChecked}</div>
            <div className="player-item player-stat-big">{props.playerRow.kills}/{props.playerRow.deaths}({props.playerRow.kd})</div>
            <div className="player-item player-stat">{props.playerRow.headshots}</div>
            <div className="player-item player-stat">{props.playerRow.kill_shot}</div>
            <div className="player-item player-stat">{props.playerRow.kill_arrow}</div>
        </div>
    )
}