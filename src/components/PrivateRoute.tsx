import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        () => localStorage.getItem('token') !== null
    );
    const location = useLocation()


    return isLoggedIn ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/auth"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}
