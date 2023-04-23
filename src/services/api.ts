import axios from 'axios';
import { Player, PlayerStats } from '../interfaces/magic';
import { RCCPlayer } from '../interfaces/rcc';
import { AuthData } from '../interfaces/auth'
import { IAvatar } from '../interfaces/steam';
import { ICreateProfileData, IProfileData, IProfileSettings } from '../interfaces/profile';

const apiUrl: string = process.env.REACT_APP_API_URL

function authHeaders(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
}

class CheckAPI {
    checkApiUrl: string

    constructor() {
        this.checkApiUrl = apiUrl + '/checks'
    }

    async getCheckedPlayers(steamids: string[], token: string) {
        const response = await axios.post<{ [key: string]: number }>(`${this.checkApiUrl}/get_checked`, steamids, authHeaders(token))
        return response.data
    }
}

class RCCAPI {
    rccApiUrl: string

    constructor() {
        this.rccApiUrl = apiUrl + '/rcc'
    }

    async getRCCPlayer(steamid: string, token: string) {
        const response = await axios.get<RCCPlayer>(`${this.rccApiUrl}/player/${steamid}`, authHeaders(token))
        return response.data
    }

    async getRCCPlayers(steamids: Array<string>, token: string) {
        const response = await axios.post<RCCPlayer[]>(`${this.rccApiUrl}/players`, steamids, authHeaders(token));
        return response.data

    }
}

class magicAPI {
    magicApiUrl: string

    constructor() {
        this.magicApiUrl = apiUrl + '/magic'
    }

    async getOnlinePlayers(token: string) {
        const response = await axios.get<Player[]>(`${this.magicApiUrl}/players/online`, authHeaders(token))
        return response.data
    }

    async getOnlinePlayersDict(token: string) {
        const response = await axios.get<{ [key: string]: Player }>(`${this.magicApiUrl}/players/online/dict`, authHeaders(token))
        return response.data
    }

    async getOnlineNewPlayers(days: number, stats: boolean = false, token: string) {
        const response = await axios.get<Player[]>(`${this.magicApiUrl}/players/new?days=${days}&stats=${stats}`, authHeaders(token))
        return response.data
    }

    async getPlayerStats(serverNumber: number, steamid: string, token: string) {
        const response = await axios.get<PlayerStats>(`${this.magicApiUrl}/server/${serverNumber}/stats/${steamid}`, authHeaders(token))
        return response.data
    }

    async fillPlayersStats(players: Player[], token: string) {
        const response = await axios.post<Player[]>(`${this.magicApiUrl}/players/fill-stats`, players, authHeaders(token))
        return response.data
    }
}

class authAPI {
    authApiUrl: string

    constructor() {
        this.authApiUrl = apiUrl + '/auth'
    }

    async vkAuth(code: string) {
        const response = await axios.get<AuthData>(`${this.authApiUrl}/vk?code=${code}`)
        if (response.data.token) {
            return response.data
        }
        else {
            throw new Error('Cant login')
        }
    }

    async isLoggedIn(token: string) {
        const response = await axios.get(`${this.authApiUrl}/validate`, authHeaders(token))
        if (response.status == 204) return true;
        return false;
    }


}

class steamAPI {
    steamApiUrl: string

    constructor() {
        this.steamApiUrl = apiUrl + '/steam'
    }
    async getAvatarUrl(steamid: string, token: string) {
        const response = await axios.get<IAvatar>(`${this.steamApiUrl}/user/avatar/${steamid}`, authHeaders(token))
        return response.data
    }
}

class profileAPI {
    profileApiUrl: string

    constructor() {
        this.profileApiUrl = apiUrl + '/moderator'
    }

    async getData(token: string) {
        const response = await axios.get<IProfileData>(`${this.profileApiUrl}/data`, authHeaders(token));
        return response.data;
    }

    async getSettings(token: string) {
        const response = await axios.get(`${this.profileApiUrl}/settings`, authHeaders(token));
        return IProfileSettings.fromAxiosResponse(response.data);
    }

    async putSettings(settings: IProfileSettings, token: string) {
        const response = await axios.put(`${this.profileApiUrl}/settings`, settings, authHeaders(token));
        return response.data;
    }

    async createModerator(moderator: ICreateProfileData, token: string) {
        const response = await axios.post(`${this.profileApiUrl}/new`, moderator, authHeaders(token))
        if (response.status != 204) throw new Error('Failed when create new moderator')
        return response.status
    }
}




export const RCCApi = new RCCAPI()
export const magicApi = new magicAPI()
export const authApi = new authAPI()
export const steamApi = new steamAPI()
export const profileApi = new profileAPI()
export const checkApi = new CheckAPI() 