import { Header } from "../components/Header";
import { ProfileSettings } from "../components/Profile";

import '../styles/profile.css'

export function ProfilePage() {
    return (
        <div><Header />
            <ProfileSettings />
        </div>
    )
}