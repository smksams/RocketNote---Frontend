import { FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Content, Brand, Menu, Search, NewNote} from './style';

import { Header } from '../../components/Header';
import { Note } from '../../components/Note';
import { Section } from '../../components/Section';
import { Input } from '../../components/Input';
import { ButtonText } from '../../components/ButtonText';

import { api } from '../../services/api';


export function Home() {
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate()

    function handleTagSelected(tagName) {
        if(tagName === 'all') {
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)

            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName])
        }


    }

    function handleDetails(id) {
        navigate(`/details/${id}`)
    }



    useEffect(() => {
        async function fetchTags() {
            const response = await api.get('/tags')
            setTags(response.data)
        }

        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes()
    }, [tagsSelected, search])

    return (
        <Container>

            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText
                    onClick={() => handleTagSelected('all')}
                    isActive={tagsSelected.length === 0}
                    title="Todos"
                /></li>
                {
                    tags && tags.map(tag =>
                        <li key={String(tag.id)}>
                            <ButtonText
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                                title={tag.name}
                            /></li>)
                }
            </Menu>

            <Search>
                <Input
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Pesquisar pelo título"
                />
            </Search>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>

            <Content>
                <Section title="Minhas notas">
                        {
                            notes.map(note => (
                                <Note 
                                key={String(note.id)}
                                data={note} 
                                onClick={() => handleDetails(note.id)}
                                />
                            ))

                        }

                </Section>

            </Content>


        </Container>


    )
}