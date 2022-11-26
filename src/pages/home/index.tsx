import React from "react";
import { Button, Container, Box, Grid } from '@mui/material';
import { HeaderComponet } from '../../components/Header/index';
import { characters } from '../../api/characters';
import { CardComponet } from "../../components";
import { TypeCharacter } from "./interface/character.interface";




export const HomePage: React.FC<{}> = () => {
  const [allCharacters, setAllCharacter] = React.useState<TypeCharacter[] | null>(null)


  React.useEffect( ()=> {
    characters.getAll({})
      .then( res =>{ setAllCharacter(res.data.results) } )
      .catch( error => {console.log(error)} )
  }, [])

  return (
    <Container maxWidth="xl">
      <HeaderComponet 
        title="Hola Mundo"
        description="Bienvenido a Codrr"
        element={<Button fullWidth variant="contained">Hola Mundo</Button> }
      />

      {
        
        allCharacters?.length !== 0 ? (
          <Grid container spacing={2} direction="row">
            {allCharacters?.map(({id, image, name, species, status}) => (
              <Grid item xs={3}>
                <CardComponet key={id} image={image} name={name} species={species} status={status} />
              </Grid>
            ))}
          </Grid>
        ) : <div>No hay personajes</div>
        
      }

    </Container>
  )
}