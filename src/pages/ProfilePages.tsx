import { Header } from "../components/Header";
import { ProfileSettings } from "../components/ProfileSettings";

import '../styles/profile.css'

export function ProfilePage() {
    return (
        <div><Header />
            <ProfileSettings />
        </div>
    )
}