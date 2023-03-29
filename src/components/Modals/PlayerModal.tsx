import rcc_logo from '../../assets/rcc_logo.svg'
import steam_logo from '../../assets/steam_logo.png'

import '../../styles/player_modal.css'


export function PlayerModal() {
    return (
        <div className='player-modal-container'>
            <div className='info' >
                <div><img src="https://avatars.akamai.steamstatic.com/76c4f11192698de1bdd36c7a67df53bdb944404e_full.jpg" alt="" className="player-img" /></div>
                <div className='player-info'>
                    <div className='name'>Name Name Name Name Name</div>
                    <div className='steamid'>76561198985395304</div>
                    <div className='stats'>
                        <div className='stat'>
                            <span>K: 10(6)</span> <br /> <span>D: 2</span>
                        </div>
                        <div className='stat'>
                            <span>KD: 5</span> <br /> <span>HS: 60%</span>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <hr />
                <div className='actions'>
                    <img src={steam_logo} alt="" height='57' />
                    <img className='logo' src={rcc_logo} alt="" height='43' />
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
                <div className='ban-line'>
                    <span className='server-name'>grand</span>
                    <span className='reason'>Покинул сервер во время проверки</span>
                    <span className='date'>01.03.2022</span>
                    <span className='date'>навсегда</span>
                    <span className='proof'>icon</span>
                </div>

                <div className='ban-line'>
                    <span className='server-name'>bro</span>
                    <span className='reason'>macros</span>
                    <span className='date'>29.03.2023</span>
                    <span className='date'>навсегда</span>
                    <span className='proof'>icon</span>
                </div>
            </div>
        </div >
    )

}