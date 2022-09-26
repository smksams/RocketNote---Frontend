import { useState } from 'react';
import { Container, Form } from './style';

import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { ButtonText } from '../../components/ButtonText';

export function New() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    const navigate = useNavigate()

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink])
        setNewLink('')
    }

    function handleDeleteLink(linkDeleted) {
        setLinks(prevState => prevState.filter(link => link !== linkDeleted))
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag('')
    }

    function handleDeleteTag(tagDeleted) {
        setTags(prevState => prevState.filter(tag => tag !== tagDeleted))
    }

    async function handleNewNote() {

        if(!title) {
            return alert("Titulo obrigatório")
        }

        if(newLink) {
            return alert("Favor adicionar ou limpar o campo do link")
        }

        if(newTag) {
            return alert("Favor adicionar ou limpar o campo da tag")
        }


        try{
            await api.post('/notes', {
                title,
                description,
                links,
                tags
            });
            alert('Nota criada com sucesso')
            navigate(-1)
        } catch {
            alert("Erro")
        }
    }

    return (
        <Container>

            <Header />

            <main>

                <Form>

                    <header>
                        <h1>Criar nota</h1>
                            <ButtonText 
                            onClick={() => navigate(-1)}
                            title="voltar" 
                            />
                    </header>

                    <Input 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Título" 
                    />

                    <Textarea 
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Observações" 
                    />

                    <Section title="Links úteis" >
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={index}
                                    value={link}
                                    onClick={() => handleDeleteLink(link)}
                                />
                            ))
                        }

                        <NoteItem
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                            value={newLink}
                            placeholder="Novo link"
                            isNew />

                    </Section>

                    <Section title="Marcadores" >
                        <div className='tags'>

                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                    key={index}
                                    value={tag} 
                                    onClick={() => handleDeleteTag(tag)}
                                    />
                                ))
                            }

                            <NoteItem
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                                value={newTag}
                                placeholder="Nova tag"
                                isNew
                            />
                        </div>
                    </Section>

                    <Button 
                    onClick={handleNewNote}
                    title="Salvar" 
                    />
                </Form>
            </main>

        </Container>
    );
};