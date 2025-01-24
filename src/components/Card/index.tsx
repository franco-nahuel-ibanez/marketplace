import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart } from '../../redux/slices/card.slices';
import { setItem } from '../../utils/localStorage';

type CardProps = {
  image: string;
  name: string;
  species: string;
  status: string;
  id: number;
}

export const CardComponet: React.FC<CardProps> = ({image, name, species, status, id}) => {
  const [disabledBtn, setDisableBtn] = React.useState<boolean>(false)
  let navigate = useNavigate()
  const dispatch = useAppDispatch()

  const itemExist = useAppSelector( (state) => state.cartReducer )

  React.useEffect( () => {
    itemExist.some( (item) => item.id === id ) ? setDisableBtn(true) : setDisableBtn(false);
    setItem('cart', itemExist)
  }, [itemExist, id] )

  const handleAddToCart = () => {
    dispatch( addToCart({ id, name, image, info: status }) )
  }
  
  return (
    <Card >
      <CardMedia 
        component="img"
        height="194"
        image={image}
      />

      <CardContent>
        <Typography variant='h4' sx={{mb: 1.5}}>{name}</Typography>
        <Divider />
        <Typography sx={{mt: 1.5}}>Especie: {species}</Typography>
        <Typography sx={{mt: 1.5}}>Estado: {status}</Typography>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => navigate(`character/${id}`)}
          variant='contained'
          size="small"
          fullWidth
        >
           Learn More
        </Button>

          <Button
            onClick={handleAddToCart}
            disabled={disabledBtn}
            variant='outlined'
            size="small"
            fullWidth
          >
            Add To Cart
          </Button>
      </CardActions>
    </Card>
  )
}