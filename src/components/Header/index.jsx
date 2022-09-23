import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './style';

import { useAuth } from '../../hooks/Auth';

export function Header() {
    const { signOut } = useAuth();

    return (
        <Container>
            <Profile to='/profile'>
                <img 
                src='https://github.com/smksams.png' 
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