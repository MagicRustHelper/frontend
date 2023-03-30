import { RCCBan } from "../../interfaces/rcc";
import { getFixedServerName, getFormattedDate } from "../../utils/utils";

interface BanModalRowProps {
    rccBan: RCCBan
}


export function BanModalRow(props: BanModalRowProps) {

    return (
        <div className={getLineClass(props.rccBan.active)}>
            <span className='server-name'>{getFixedServerName(props.rccBan.serverName)}</span>
            <span className='reason'>{props.rccBan.reason}</span>
            <span className='date'>{getBanDate(props.rccBan.banDate)}</span>
            <span className='date'>{getUnbanDate(props.rccBan.unbanDate)}</span>
            <span className='proof'>icon</span>
        </div>
    )
}

function getBanDate(timestamp: number) {
    return getFormattedDate(timestamp)
}

function getUnbanDate(timestamp: number | undefined) {
    console.log(timestamp)
    if (timestamp == undefined || timestamp <= 0) {
        return 'навсегда'
    }
    return getFormattedDate(timestamp)
}

function getLineClass(active: boolean) {
    const lineStyleClass = active ? '' : 'not-active'
    return ['ban-line', lineStyleClass].join(' ');
}