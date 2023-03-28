import '../styles/header.css';
import { getAvatarUrl } from '../utils/localStorage';


export function Header() {
    const avatarUrl = getAvatarUrl()
    return (
        <header>
            <div className='container'>
                <nav>
                    <div className='nav-left'>
                        <div className="nav-item"><a href="/bans">Поиск банов</a></div>
                        <div className="nav-item"><a href="">Поиск по стате</a></div>
                        <div className="nav-item"><a href="">Репорты</a></div>
                        <div className="nav-item"><a href="">Статистика</a></div>
                    </div>
                    <div className='nav-right'>
                        <a href="/profile"> <img src={avatarUrl} alt='' className='profile-avatar' />  </a>
                    </div>
                </nav>
            </div>
        </header>

    )
}