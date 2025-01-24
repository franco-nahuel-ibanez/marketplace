import React from 'react';
import { Card, Divider, Grid, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../redux/hooks';
import { removeToCart } from '../../redux/slices/card.slices';

type CardProps = {
  id: string | number
  image: string;
  name: string;
  info: string
}

export const HorizontalCardComponet: React.FC<CardProps>  = ({id, image, name, info}) => {

  const dispatch = useAppDispatch()

  const handleDeleteCard = () => {
    dispatch( removeToCart({id}) )
  }

  return (
    <Card sx={{display: 'flex', my:2}}>
      <CardMedia 
        component='img'
        style={{width: '150px'}}
        image={image}
      />

      <Grid container sx={{mx: 2}}>
        <Grid item xs={9}>
          <CardContent>
            <Typography variant='h4' sx={{mb:1}}>{name}</Typography>
            <Divider />
            <Typography sx={{mt: 1}}>{info}</Typography>
          </CardContent>
        </Grid>

        <Grid item xs={2}>
          <CardActions>
            <IconButton onClick={ handleDeleteCard }>
              <ClearIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}