import React from 'react'
import { Drawer, Box, Stack, Typography, IconButton, Divider } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { iteratorSymbol } from 'immer/dist/internal';
import { useAppSelector } from '../redux/hooks';
import { HorizontalCardComponet } from '../components/HorizontalCard';

type CartProps = {
  open: boolean
  handleStateViewDrawer: () => void
}

export const CartComponet: React.FC<CartProps> = ({open, handleStateViewDrawer}) => {
  
  const items = useAppSelector( state => state.cartReducer )

  return (
    <Drawer
      anchor='right'
      open={open}
    >
      <Box sx={{width: '25em', p:2}}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Typography variant='h5'>Cart</Typography>
          <IconButton
            onClick={handleStateViewDrawer}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
        <Divider sx={{my: 1.5}} />
        {
          items.length !== 0 ? items.map(({id,image, name, info}) => (
            <HorizontalCardComponet 
              key={id}
              id={id}
              image={image}
              name={name}
              info={info}
            />
          ))
          : "Nada por aqui"
        }
        
      </Box>
    </Drawer>
  )
}
