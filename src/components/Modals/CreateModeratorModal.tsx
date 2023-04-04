import { error } from 'console'
import { ICreateProfileData } from 'interfaces/profile'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { profileApi } from 'services/api'
import { getBearerToken } from 'utils/localStorage'

export function CreateModeratorModal() {
    const token = getBearerToken()

    const [name, setName] = useState<string>('')
    const [steamid, setSteamid] = useState<string>('')
    const [vkId, setVkId] = useState<string>('')
    const [avatarLink, setAvatarLink] = useState<string>('')
    const [isSuperuser, setIsSuperuser] = useState<boolean>(false)
    const [isBot, setIsBot] = useState<boolean>(false)
    const [newModerator, setNewModerator] = useState<ICreateProfileData | null>(null)


    function handleSumbitNewModerator(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        updateNewModerator()
        console.log(event)
    }

    function updateNewModerator() {
        const newModerator: ICreateProfileData = {
            'name': name,
            'steamid': steamid,
            'vk_id': vkId,
            'avatar_url': avatarLink,
            'is_bot': false,
            'is_superuser': false
        }
        setNewModerator(newModerator)
    }

    async function createModerator() {
        if (newModerator) {
            await toast.promise(
                profileApi.createModerator(newModerator, token),
                {
                    pending: 'Модератор создается',
                    success: 'Новый модератор добавлен!',
                    error: 'Не получилось добавить модератора'
                }
            )

        }

    }

    useEffect(() => {
        if (newModerator) {
            createModerator()
        }
    }, [newModerator])


    return (
        <>
            <h1>Новый модератор</h1>
            <form onSubmit={handleSumbitNewModerator}>
                <input type="text" placeholder="Имя" className="form-input" value={name} onChange={(event) => setName(event.target.value)} />
                <input type="text" placeholder="Steamid" className="form-input" value={steamid} onChange={(event) => setSteamid(event.target.value)} />
                <input type="text" placeholder="Вк айди" className="form-input" value={vkId} onChange={(event) => setVkId(event.target.value)} />
                <input type="text" placeholder="Ссылка на аватарку" className="form-input" value={avatarLink} onChange={(event) => setAvatarLink(event.target.value)} />
                <label>
                    Супер-пользователь
                    <input type="checkbox" checked={isSuperuser} onChange={() => setIsSuperuser(prev => !prev)} />
                </label>
                <label>
                    Бот
                    <input type="checkbox" checked={isBot} onChange={() => setIsBot(prev => !prev)} />
                </label>
                <input type="submit" value='Создать' className="form-submit" />
            </form>

        </>
    )
}
