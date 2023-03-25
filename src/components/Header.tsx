import React from 'react';
import '../styles/header.css';
import profile from '../assets/profile.png'


export function Header() {
    return (
        <header>
            <div className='container'>
                <nav>
                    <div className='nav-left'>
                        <div className="nav-item"><a href="">Поиск банов</a></div>
                        <div className="nav-item"><a href="">Поиск по стате</a></div>
                        <div className="nav-item"><a href="">Репорты</a></div>
                        <div className="nav-item"><a href="">Статистика</a></div>
                    </div>
                    <div className='nav-right'>
                        <a href=""> <img src={profile} alt='' />  </a>
                    </div>
                </nav>
            </div>
        </header>

    )
}