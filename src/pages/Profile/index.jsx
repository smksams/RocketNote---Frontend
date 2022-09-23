import { useState } from 'react';
import { Container, Form, Avatar } from './style';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { api } from '../../services/api';
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

export function Profile() {
    const { user, profileUpdate } = useAuth()
    const [ name, setName ] = useState(user.name)
    const [ email, setEmail ] = useState(user.email)
    const [ passwordOld, setPasswordOld ] = useState()
    const [ passwordNew, setPasswordNew ] = useState()

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

    const [ avatar, setAvatar ] = useState(avatarURL)
    const [ avatarFile, setAvatarFile ] = useState(null)

    async function handleProfile(){
        const user = {
            name,
            email,
            old_password: passwordOld,
            password: passwordNew
        }

        await profileUpdate({ user, avatarFile })

    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }
    
    return (
        <Container>

            <header>
                <a href='/'>
                    <FiArrowLeft />
                </a>
            </header>


            <Form>

                <Avatar>
                    <img 
                    src={avatar} 
                    alt='Foto do usuário' />
                    <label htmlFor='avatar'>
                        <FiCamera />
                    <input onChange={handleChangeAvatar} id='avatar' type='file' />
                    </label>
                </Avatar>

                <Input
                    placeholder='Nome'
                    type='text'
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder='E-mail'
                    type='email'
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    placeholder='Senha atual'
                    type='password'
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                <Input
                    placeholder='Nova senha'
                    type='password'
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />
                <Button title='Salvar' onClick={handleProfile} />
            </Form>

        </Container>

    )
}