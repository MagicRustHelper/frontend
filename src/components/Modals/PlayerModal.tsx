import rcc_logo from '../../assets/rcc_logo.svg'
import steam_logo from '../../assets/steam_logo.png'

import '../../styles/player_modal.css'
import { usePlayerStats } from '../../hooks/getPlayerStats'
import { useRCCPlayer } from '../../hooks/getRCCPlayer'
import { useSteamAvatarUrl } from '../../hooks/getAvatarUrl'
import { BanModalRow } from '../PlayerRows/BanModalRow'
import { IBanRow, IStatRow } from '../../interfaces/rows'
import { baseRCCPlayerURL, baseSteamProfileURL } from '../../constants'
import useCopyToClipboard from '../../hooks/copyToClickBoard'



interface PlayerModalProps {
    playerRow: IBanRow | IStatRow
}

export function PlayerModal(props: PlayerModalProps) {
    const [value, copy] = useCopyToClipboard()
    const playerStats = usePlayerStats(props.playerRow.serverNumber, props.playerRow.steamid)
    const rccPlayer = useRCCPlayer(props.playerRow.steamid)
    const avatarUrl = useSteamAvatarUrl(props.playerRow.steamid)

    return (
        <div className='player-modal-container'>
            <div className='info' >
                <div><img src={avatarUrl?.avatarFullUrl} alt="" className="player-img" /></div>
                <div className='player-info'>
                    <div className='name'>{props.playerRow.nickname}</div>
                    <div className='steamid' onClick={() => copy(props.playerRow.steamid)}>{props.playerRow.steamid}</div>
                    <div className='stats'>
                        <div className='stat'>
                            <span>K: {playerStats?.kp_total}({playerStats?.kp_head})</span> <br /> <span>D: {playerStats?.d_player}</span>
                        </div>
                        <div className='stat'>
                            <span>KD: {playerStats?.kd}</span> <br /> <span>HS: {playerStats && getHSPercentage(playerStats.kp_total, playerStats.kp_head)}%</span>
                        </div>

                    </div>
                </div>
                <div className='line'></div>
                <hr />
                <div className='actions'>
                    <a href={baseSteamProfileURL + props.playerRow.steamid} target='_blank' ><img src={steam_logo} alt="" height='57' /></a>
                    <a href={baseRCCPlayerURL + props.playerRow.steamid} target='_blank'><img className='logo' src={rcc_logo} alt="" height='43' /></a>
                    <button className='action-button' >Выдать доступ</button>
                </div>
            </div>
            <div className='ban-table'>
                <hr />

                <div className='ban-line'>
                    <span className='server-name'>Сервер</span>
                    <span className='reason'>Причина</span>
                    <span className='date'>Дата бана</span>
                    <span className='date'>Дата разбана</span>
                    <span className='proof'>Пруф</span>
                </div>
                <hr />
                {rccPlayer?.bans.map(ban => <BanModalRow rccBan={ban} />)}
            </div>
        </div >
    )

}

function getHSPercentage(kills: number, headshots: number) {
    if (kills == 0) {
        return 0
    }
    return (headshots / kills * 100).toFixed(0)
}