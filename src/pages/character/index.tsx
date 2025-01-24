import { Box, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useParams } from "react-router-dom"
import { characters } from '../../api/characters'
import { Character } from './interface/character.interface'


const CharacterPage: React.FC = () => {
  const {id} = useParams()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [character, setCharacter] = React.useState<Character | null>()

  React.useEffect( () =>{
    characters.getById({id})
      .then( res => {
        setCharacter(res.data)
        setLoading(false)
      })
      .catch( (err) => console.log(err) )    
  }, [])

  return (
    <Box sx={{width:'100%'}}>
      <Container maxWidth='xl'>
        {loading 
          ? (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
              <CircularProgress />
            </Box>
            )
          : (<Grid sx={{mt: 2}} container columnSpacing={2}>
              <Grid item xs={6}>
                <Typography variant='h1'>{character?.name}</Typography>
                <Divider />
                <Typography variant='h6'>{character?.origin.name}</Typography>
                <Box sx={{mt: 2}}>
                  <Chip 
                    color={`${character?.status ? 'primary' : 'error'}`} 
                    variant='outlined' 
                    label={character?.status}></Chip>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <img src={character?.image} style={{width: "100%", borderRadius: "0.5em"}} />
              </Grid>
            </Grid>
          )
        }
      </Container>
    </Box>
  )
}

export default CharacterPage;