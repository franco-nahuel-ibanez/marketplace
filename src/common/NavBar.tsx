import React from "react"
import { AppBar, Box, Container, Grid, Toolbar, Button, Typography, Stack, IconButton, Badge } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom"
import { CartComponet } from "./Cart";
import { useAppSelector } from "../redux/hooks";



export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState<boolean>(false)
  const items = useAppSelector( state => state.cartReducer )

  const handleStateViewDrawer = () => {
    setOpen( (state) => !state )
  }

  return (
    <Box sx={{flexGrow: 1}}>
       <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid 
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Codrr</Typography>
              </Grid>

              <Grid item>
                <Stack spacing={2} direction="row">
                <Badge badgeContent={items.length} color="error">
                  <IconButton
                    onClick={handleStateViewDrawer}
                  >
                    <ShoppingCartIcon color="primary"/>
                  </IconButton>
                </Badge>

                  <Button
                    variant="contained"
                    onClick={() => navigate("login")}
                  >
                    Login
                  </Button>
                  <Button variant="outlined">Register</Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
       </AppBar>
       <CartComponet open={open} handleStateViewDrawer={handleStateViewDrawer} />
    </Box>
  )
}