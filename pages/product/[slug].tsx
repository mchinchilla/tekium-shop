import { NextPage, GetStaticPaths, GetStaticProps } from "next";

import {Box, Button, Chip, Grid, Link, Rating, TextField, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {styled} from "@mui/material/styles";

import {ShopLayout} from "../../components/layouts";
import {ProductSlideshow, SizeSelector} from "../../components/products";
import {ItemCounter} from "../../components/ui";

import {IProduct} from "../../interfaces";
import { dbProducts } from "../../database";

interface Props {
    product: IProduct;
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const ProductPage : NextPage<Props> = ( { product } ) => {

    return (
        <ShopLayout title={ product.title } pageDescription={ product.description }>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* Titulo   */}
                        <Typography variant='h1' component='h1'>{product.title}</Typography>
                        <Typography variant='subtitle1' component='h2'>${`${product.price}`}</Typography>

                        {/* Cantidad   */}
                        <Box sx={{my: 2}}>
                            <Typography variant='subtitle2'>Cantidad</Typography>
                            {/* Item Counter  */}
                            <ItemCounter count={1}/>
                            <SizeSelector
                                // selectedSize={ product.sizes[0] }
                                sizes={product.sizes}
                            />
                        </Box>
                        {/*  Add Carrito  */}
                        <Button color="secondary" sx={{borderRadius: '8px'}}>
                            Agregar al Carrito
                        </Button>
                        {/*<Chip label="No hay disponibles"  color="error" variant='outlined' />*/}

                        {/*  Descripcion  */}
                        <Box sx={{mt: 3}}>
                            <Typography variant='subtitle2'>Descripción:</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>
                        <Box sx={{mt: 2}} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <StyledRating
                                name="product-rating"
                                defaultValue={2.5}
                                //getLabelText={(value: number) => `${product.rate} Heart${product.rate !== 1 ? 's' : ''}`}
                                precision={0.1}
                                value={product.rate}
                                icon={<FavoriteIcon fontSize="inherit"/>}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                                onChange={(event, value) => {
                                    console.log(value);
                                    // setNewRate(value);
                                    // TODO: update product rate in the Database if user is authenticated and has bought the product
                                }}
                            />
                            <Button variant={'outlined'} color={'success'}>
                                Agregar comentario
                            </Button>
                        </Box>
                        <Box display={'flex'} sx={{mt: 2}}>
                            <TextField
                                id="product-review"
                                //label="Product Review"
                                placeholder={'Escribe tu comentario'}
                                multiline
                                rows={8}
                                defaultValue=""
                                variant="filled"
                                fullWidth
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};


/*
// No usar esto ... SSR
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );

    if (!product) {
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            product: product,
        }
    }
}
*/



export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductsSlugs();

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: { slug }
        })),
        fallback: 'blocking'
    };
}



export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug( slug );

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product: product,
        },
        revalidate: 86400
    }
}

export default ProductPage;