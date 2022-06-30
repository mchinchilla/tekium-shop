import NextLink from "next/link";

import {Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography} from "@mui/material";
import {CreditCardOffOutlined, CreditScoreOutlined} from "@mui/icons-material";

import {ShopLayout} from "../../components/layouts";
import {CartList, OrderSummary} from "../../components/cart";


const OrderPage = () => {
    return (
        <ShopLayout title='Resumen de Orden 132654789465' pageDescription='Resumen de la orden'>
            <Typography variant='h1' component="h1">Orden 132654789465</Typography>

            {/*
            <Chip
                sx={{ my: 2, borderRadius: '8px' }}
                label="Pendiente de pago"
                color="error"
                variant={'outlined'}
                icon={ <CreditCardOffOutlined /> }
            />
            */}

            <Chip
                sx={{ my: 2, borderRadius: '8px' }}
                label="Orden Pagada"
                color="success"
                variant={'outlined'}
                icon={ <CreditScoreOutlined /> }
            />

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable={false}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 Productos)</Typography>
                            <Divider sx={{my: 1}}></Divider>

                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant='subtitle1'>Direccion de Entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline={'always'}>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Marvin Chinchilla</Typography>
                            <Typography>333 Algun lugar</Typography>
                            <Typography>Algun Lugar, B 33, casa 25</Typography>
                            <Typography>Tegucigalpa, Honduras</Typography>
                            <Typography>+504 72168888</Typography>

                            <Divider sx={{my: 1}}></Divider>

                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant='subtitle1'>Items</Typography>
                                <NextLink href='/cart' passHref>
                                    <Link underline={'always'}>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary/>

                            <Box sx={{mt: 3}}>
                                {/*  TODO   */}
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2, borderRadius: '8px' }}
                                    label="Orden Pagada"
                                    color="success"
                                    variant={'outlined'}
                                    icon={ <CreditScoreOutlined /> }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default OrderPage;