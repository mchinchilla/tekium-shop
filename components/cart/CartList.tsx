import {FC} from "react";
import NextLink from "next/link";

import {initialData} from '../../database/products';
import {Box, Button, CardActionArea, CardMedia, Grid, IconButton, Link, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {ItemCounter} from "../ui";


interface Props {
    editable?: boolean;
}


const ProductsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
];

export const CartList: FC<Props> = ( { editable= false } ) => {

    return (
        <>
            {
                ProductsInCart.map( product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb:1 }}>
                        <Grid item xs={3}>
                            {/* Todo: llevar a la pagina del producto */}
                            <NextLink href='/product/slug' passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={ `/products/${product.images[0] }`}
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
                                <Typography variant='body1' >Talla: <strong>M</strong></Typography>
                                {/* Condicional    */}
                                {
                                    editable
                                    ? <ItemCounter count={1}/>
                                    : <Typography>3 Items</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant={'subtitle1'} >{`$${product.price}`}</Typography>
                            {/* Condicion si es Editable   */}
                            {
                                editable && (
                                    <IconButton aria-label="delete" size="large" color="error">
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