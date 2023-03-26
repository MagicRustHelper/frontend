export interface IProfileData {
    id: number
    name: string
    avatar_url: string
    vk_id: number
}


export class IProfileSettings {
    moderator_id: number
    player_is_new: number
    exclude_servers: string[]
    include_reasons: string[]
    exclude_reasons: string[]

    constructor(moderator_id: number, player_is_new: number, exclude_servers: string[], include_reasons: string[], exclude_reasons: string[]) {
        this.moderator_id = moderator_id
        this.player_is_new = player_is_new
        this.exclude_servers = exclude_servers
        this.include_reasons = include_reasons
        this.exclude_reasons = exclude_reasons
    }

    changeAttribute(attribute: string, value: any) {
        switch (attribute) {
            case 'moderator_id':
                this.moderator_id = value
                break
            case 'player_is_new':
                this.player_is_new = value
                break
            case 'exclude_servers':
                this.exclude_servers = value
                break
            case 'include_reasons':
                this.include_reasons = value
                break
            case 'exclude_reasons':
                this.exclude_reasons = value
                break
        }
    }

    getAttribute(attribute: string) {
        switch (attribute) {
            case 'exclude_servers':
                return this.exclude_servers
            case 'include_reasons':
                return this.include_reasons
            case 'exclude_reasons':
                return this.exclude_reasons
        }
        return null
    }

    setAttribute(attribute: string, value: any) {
        switch (attribute) {
            case 'exclude_servers':
                this.exclude_servers = value
                break
            case 'include_reasons':
                this.include_reasons = value
                break
            case 'exclude_reasons':
                this.exclude_reasons = value
                break
        }
    }


    createCopyWithAttribute(attribute: string, value: any) {
        const copy = new IProfileSettings(this.moderator_id, this.player_is_new, this.exclude_servers, this.include_reasons, this.exclude_reasons)
        copy.changeAttribute(attribute, value)
        return copy
    }

    toJson() {
        return JSON.stringify(this)
    }

    static fromJson(json: string) {
        const data = JSON.parse(json)
        return new IProfileSettings(data.moderator_id, data.player_is_new, data.exclude_servers, data.include_reasons, data.exclude_reasons)
    }

    static fromAxiosResponse(response: any) {
        return new IProfileSettings(response.moderator_id, response.player_is_new, response.exclude_servers, response.include_reasons, response.exclude_reasons)
    }

}
