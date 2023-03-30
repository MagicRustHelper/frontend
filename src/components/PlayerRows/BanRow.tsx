import { IBan, IBanRow } from "../../interfaces/rows";
import '../../styles/player_table.css'
import { baseRCCPlayerURL } from "../../constants";
import { getFixedServerName } from "../../utils/utils";
import useCopyToClipboard from "../../hooks/copyToClickBoard";

interface BanRowProps {
    playerRow: IBanRow;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    setModalPlayerRow: React.Dispatch<React.SetStateAction<IBanRow | null>>
}

export function BanRow(props: BanRowProps) {
    const isNewAccount = props.playerRow.isNewAccount ? '👽' : '';
    const isChecked = props.playerRow.isChecked ? '🕶' : '';
    const [value, copy] = useCopyToClipboard()
    function activePlayerModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // @ts-ignore idk why ts dont know about atrributes of target
        if (event.target.className == "player-row") {
            props.setModalPlayerRow(props.playerRow)
            props.setModalActive(true)
        }
    }

    return (
        <div className='player-row' onClick={activePlayerModal}>
            <div className='player-item player-server' >{props.playerRow.serverNumber}</div>
            <img src={props.playerRow.avatar} alt='' className='player-item player-img' />
            <a href={baseRCCPlayerURL + props.playerRow.steamid} target="_blank" className='player-item player-nickname'>{props.playerRow.nickname}</a>
            <div className='player-item player-id' onClick={() => copy(props.playerRow.steamid)}>{props.playerRow.steamid}</div>
            <div className='player-item player-new'>{isNewAccount}</div>
            <div className='player-item player-checked'>{isChecked}</div>
            <div className='player-item player-server-ban'>{getBansString(props.playerRow.bans)}</div>
        </div>
    )
}




function getBansString(bans: IBan[]): string {
    if (typeof bans === undefined) {
        return ''
    }
    let banString = ''
    for (var ban of bans) {
        if (ban?.isShow == false) continue;
        const serverName: string = getFixedServerName(ban.serverName)
        banString += serverName + `(${ban.daysLeft}) `
    }
    return banString;
}