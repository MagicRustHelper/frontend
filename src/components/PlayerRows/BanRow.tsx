import { IBan, IBanRow } from "../../interfaces/rows";
import '../../styles/player_table.css'
import { RUST_SERVERS_NAME, baseRCCPlayerURL } from "../../constants";
import useCopyToClipboard from "../../hooks/copyToClickBoard";

interface BanRowProps {
    playerRow: IBanRow;
    byActiveBan: boolean
}

export function BanRow(props: BanRowProps) {
    const is_new_account = props.playerRow.is_new_account ? 'Да' : 'Нет';
    const is_checked = props.playerRow.is_checked ? 'Да' : 'Нет';
    const [value, copy] = useCopyToClipboard()
    console.log(props.playerRow)
    return (
        <div className='player-row'>
            <div className='player-item player-server'>{props.playerRow.server_number}</div>
            <img src={props.playerRow.avatar} alt='' className='player-item player-img' />
            <a href={baseRCCPlayerURL + props.playerRow.steamid} target="_blank" className='player-item player-nickname'>{props.playerRow.nickname}</a>
            <div className='player-item player-id' onClick={() => copy(props.playerRow.steamid)}>{props.playerRow.steamid}</div>
            <div className='player-item player-new'>{is_new_account}</div>
            <div className='player-item player-checked'>{is_checked}</div>
            <div className='player-item player-server-ban'>{getBansString(props.playerRow.bans, props.byActiveBan)}</div>
        </div>
    )
}




function getBansString(bans: IBan[], byBanActive: boolean): string {
    if (typeof bans === undefined) {
        return ''
    }
    let banString = ''
    for (var ban of bans) {
        if (ban.active != byBanActive) continue;
        const serverName: string = getFixedServerName(ban.server_name)
        banString += serverName + `(${ban.days_left}) `
    }
    return banString;
}

function getFixedServerName(serverName: string): string {
    for (let name of RUST_SERVERS_NAME) {
        if (serverName.toLowerCase().includes(name.toLowerCase())) {
            return name
        }
    }
    if (serverName.includes('GLOBAL')) {
        return serverName.replace('[GLOBAL]', '').slice(0, 15);
    }
    return serverName.slice(0, 15);
}