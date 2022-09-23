import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './style';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

export function Header() {
    const { signOut, user } = useAuth();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

    return (
        <Container>
            <Profile to='/profile'>
                <img 
                src={avatarURL} 
                alt='Foto do usuário' 
                />

                <div>
                    <span>Bem vindo,</span>
                    <strong>Samuel</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}