import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './style';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import  avatarPlaceHolder  from '../../assets/avatar_placeholder.svg'

export function Header() {
    const { signOut, user } = useAuth();
    const navigate = useNavigate()

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

    function handleSignOut(){
        signOut()
        navigate('/')
    }

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

            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}
