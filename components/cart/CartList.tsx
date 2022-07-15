import {FC, useContext} from "react";
import NextLink from "next/link";

import {initialData} from '../../database/products';
import {Box, Button, CardActionArea, CardMedia, Grid, IconButton, Link, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {ItemCounter} from "../ui";
import {CartContext} from "../../context";
import {ICartProduct} from "../../interfaces";


interface Props {
    editable?: boolean;
}



export const CartList: FC<Props> = ( { editable= false } ) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = ( product: ICartProduct, newQunatityValue: number ) => {
        product.quantity = newQunatityValue;
        updateCartQuantity(product);

    }


    return (
        <>
            {
                cart.map( product => (
                    <Grid container spacing={2} key={product.slug + product.size } sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* Todo: llevar a la pagina del producto */}
                            <NextLink href={ `/product/${product.slug}` } passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={ `/products/${product.image }`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        >
                                        </CardMedia>
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box
                                display='flex'
                                flexDirection='column'
                            >
                                <Typography variant='body1' >{ product.title }</Typography>
                                <Typography variant='body1' >Talla: <strong>{ product.size }</strong></Typography>
                                {/* Condicional    */}
                                {
                                    editable
                                    ? (
                                        <ItemCounter
                                            currentValue={ product.quantity }
                                            maxValue={ 10 }
                                            updatedQuantity={ (newValue) => onNewCartQuantityValue( product, newValue ) }
                                        />
                                        )
                                    : <Typography>{ product.quantity } { product.quantity > 1 ? 'productos' : 'producto' } </Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant={'subtitle1'} >{`$${product.price}`}</Typography>
                            {/* Condicion si es Editable   */}
                            {
                                editable && (
                                    <IconButton aria-label="delete" size="large" color="error" onClick={ () => removeCartProduct(product) }>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
};