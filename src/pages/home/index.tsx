import React from "react";
import { Button, Container, Box, Grid, CircularProgress, Pagination, Stack } from '@mui/material';
import { HeaderComponet } from '../../components/Header/index';
import { characters } from '../../api/characters';
import { CardComponet } from "../../components";
import { TypeCharacter } from "./interface/character.interface";

export const HomePage: React.FC<{}> = () => {
  const [allCharacters, setAllCharacter] = React.useState<TypeCharacter[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<number>(1)
  const [count, setCount] = React.useState<number>(1)

  React.useEffect( ()=> {
    setLoading(true)
    characters.getAll({page})
      .then( res =>{
        setCount(res.data.info.pages)
        setAllCharacter(res.data.results) 
        setTimeout(() => setLoading(false), 1000) 
      })
      .catch( error => {console.log(error)} )
  }, [page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Container maxWidth="xl">
      <HeaderComponet 
        title="Hola Mundo"
        description="Bienvenido a Codrr"
        element={<Button fullWidth variant="contained">Hola Mundo</Button> }
      />

      {loading ? (
          <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
            <CircularProgress />
          </Box>
        ): (
          <>
            <div>
              {
                allCharacters?.length !== 0 ? (
                  <Grid sx={{my: 2}} container spacing={2} direction="row">
                    {allCharacters?.map(({id, image, name, species, status}) => (
                      <Grid key={id} item xs={3}>
                        <CardComponet image={image} name={name} species={species} status={status} id={id} />
                      </Grid>
                    ))}
                  </Grid>
                ) : <div>No hay personajes</div>
              }
            </div>

            <Box sx={{width: "100%", display: 'flex', justifyContent: 'center'}}>
              <Pagination
                variant="outlined"
                color="primary"
                count={count}
                page={page}
                onChange={handleChange}
                sx={{my: 3}}
                size="large"
              />
            </Box>
          </>
        )
      }



    </Container>
  )
}