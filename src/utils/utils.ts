import { RUST_SERVERS_NAME } from "../constants";
import * as moment from 'moment-timezone'

export function getFixedServerName(serverName: string): string {
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

export function getFormattedDate(timestamp: number) {
    return moment.unix(timestamp).tz('Europe/Moscow').format("DD.MM.YYYY hh:mm")
}

export function getSearchButtonClass(state: boolean): string {
    const btnStyleClass = state ? 'search-button-pressed' : ''
    return ['search-item search-button', btnStyleClass].join(' ');
}