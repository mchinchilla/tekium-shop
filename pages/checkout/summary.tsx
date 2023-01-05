import {ShopLayout} from "../../components/layouts";
import {Box, Button, Card, CardContent, Divider, Grid, Link, Typography} from "@mui/material";
import {CartList, OrderSummary} from "../../components/cart";
import NextLink from "next/link";


const SummaryPage = () => {
    return (
        <ShopLayout title='Resumen de Orden' pageDescription='Resumen de la orden'>
            <Typography variant='h1' component="h1">Resumen de la Orden</Typography>
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
                                <NextLink href='/checkout/address' passHref legacyBehavior>
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
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline={'always'}>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary/>

                            <Box sx={{mt: 3}}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;