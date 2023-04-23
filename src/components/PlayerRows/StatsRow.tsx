import useCopyToClipboard from "hooks/copyToClickBoard";
import { baseRCCPlayerURL } from "../../constants";
import { IStatRow } from "../../interfaces/rows";

import arrow from "assets/arrow.png"
import bullet from "assets/bullet.png"
import headshot from "assets/headshot.png"

interface StatsRowProps {
    playerRow: IStatRow
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    setModalPlayerRow: React.Dispatch<React.SetStateAction<IStatRow | null>>
}

export function StatsRow(props: StatsRowProps) {
    const [value, copy] = useCopyToClipboard()

    function activePlayerModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // @ts-ignore idk why ts dont know about atrributes of target
        if (event.target.className == "player-row") {
            props.setModalPlayerRow(props.playerRow)
            props.setModalActive(true)
        }
    }

    const isNewAccount = props.playerRow.isNewAccount ? '👽' : '';
    const isChecked = props.playerRow.isChecked ? '🕶' : '';
    return (
        <div className="player-row" onClick={activePlayerModal}>
            <div className="player-item player-server">{props.playerRow.serverNumber}</div>
            <img className="player-item player-img" src={props.playerRow.avatar} alt="" />
            <a href={baseRCCPlayerURL + props.playerRow.steamid} target="_blank" className='player-item player-nickname'>{props.playerRow.nickname}</a>
            <div className="player-item player-steamid" onClick={() => copy(props.playerRow.steamid)}>{props.playerRow.steamid}</div>
            <div className="player-item player-new">{isNewAccount}</div>
            <div className="player-item player-checked">{isChecked}</div>
            <div className="player-item player-stat-big">{props.playerRow.kills}/{props.playerRow.deaths}({props.playerRow.kd})</div>
            <div className="player-item player-stat"><img className="kill-type" src={headshot} alt='HS' /> {props.playerRow.headshots}</div>
            <div className="player-item player-stat"><img className="kill-type" src={bullet} alt='GUN' /> {props.playerRow.kill_shot}</div>
            <div className="player-item player-stat"><img className="kill-type" src={arrow} alt='ARROW' /> {props.playerRow.kill_arrow}</div>
        </div>
    )
}