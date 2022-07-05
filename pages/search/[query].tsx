import type { NextPage, GetServerSideProps } from 'next'

import {Box, Typography} from "@mui/material";
import { ShopLayout } from "../../components/layouts";

import { ProductList } from "../../components/products";
import { dbProducts } from '../../database';
import {IProduct} from "../../interfaces";
import {getAllProducts} from "../../database/dbProducts";

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const HomePage: NextPage<Props> = ({ products,foundProducts,query }) => {

    return (
        <ShopLayout title={'Tekium Shop - Home'} pageDescription={'Encuentra los productos mas novedosos aqui'}>
            <Typography variant='h1' component='h1'>Buscar Producto</Typography>


            {
                foundProducts
                    ? <Typography variant='h2' sx={{mb: 1}} textTransform={'capitalize'}>Busqueda: { query }</Typography>
                    : (
                        <Box display={'flex'}>
                            <Typography variant='h2' sx={{mb: 1}}>Busqueda: </Typography>
                            <Typography variant='h2' sx={{mb: 1}} color="secondary" textTransform={'capitalize'}>{ query }</Typography>
                        </Box>
                    )
            }

            <ProductList products={ products }/>

        </ShopLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = await params as { query: string };

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query );

    const foundProducts = products.length > 0;

    // TODO: retornar otros productos basado en las busquedas del cliente.
    if (!foundProducts) {
        products = await dbProducts.getProductsByTerm( 'plaid' );
        // products = await dbProducts.getAllProducts();
    }


    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default HomePage
