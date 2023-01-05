import NextLink from 'next/link';

import {ShopLayout} from "../../components/layouts";
import {Box, Link, Typography} from "@mui/material";
import {RemoveShoppingCartOutlined} from "@mui/icons-material";

const EmptyPage = () => {
 return (
  <ShopLayout title='Carrito vacio' pageDescription='Carrito de compras vacio'>
   <Box
       display='flex'
       justifyContent='center'
       alignItems='center'
       height='calc(100vh - 200px)'
       sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
   >

    <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
    <Box
        display='flex'
        alignItems='center'
        flexDirection='column'
    >
        <Typography  >Su Carrito esta vacio</Typography>
        <NextLink href='/' passHref legacyBehavior >
            <Link typography="h4" color='secondary'>
                Regresar
            </Link>
        </NextLink>
    </Box>

   </Box>

  </ShopLayout>
 );
};

export default EmptyPage;