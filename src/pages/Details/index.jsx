import { useState, useEffect } from 'react';
import { Container, Links, Content} from './style';
import { useParams, useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';

export function Details() {
  const [data, setData] = useState(null);

  const navigate = useNavigate()
  const params = useParams()

  async function handleDelete() {
    const confirm = window.confirm("Deseja realmente excluir a nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fecthData() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fecthData()
  }, [])

  return (
    <Container>
      <Header />
      {data &&
        <main>
          <Content>

            <ButtonText 
            onClick={handleDelete}
            isActive 
            title='Excluir a nota' 
            />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links &&
              <Section title='Links úteis'>
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}><a href={link.url} target='_blank'>{link.url}</a></li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title='Marcadores'>
                {
                  data.tags.map( tag => (
                    <Tag 
                    key={String(tag.id)}
                    title={tag.name} 
                    />
                    
                  ))
                }
              </Section>
            }

              <Button 
              onClick={() => navigate(-1)}
              title='Voltar' 
              />

          </Content>
        </main>
      }
    </Container>
  )
}