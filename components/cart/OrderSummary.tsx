import {Divider, Grid, Typography} from "@mui/material";


export const OrderSummary = () => {
    return (
        <Grid container={true}

        >
            <Grid item={true} xs={6}>
                <Typography>No. Items</Typography>
            </Grid>
            <Grid item={true} xs={6} display={'flex'}  justifyContent={'end'}>
                <Typography>3</Typography>
            </Grid>
            <Grid item={true} xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item={true} xs={6} display={'flex'}  justifyContent={'end'}>
                <Typography>{ `$${ 105.36 }` }</Typography>
            </Grid>
            <Grid item={true} xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>
            <Grid item={true} xs={6} display={'flex'}  justifyContent={'end'}>
                <Typography>{ `$${ 35.34 }` }</Typography>
            </Grid>

            <Grid item={true} xs={6} sx={{ mt:2 }}>
                <Typography variant={'subtitle1'}>Total:</Typography>
            </Grid>
            <Divider sx={{ color: 'black' }}/>
            <Grid item={true} xs={6} sx={{ mt:2 }} display={'flex'}  justifyContent={'end'}>
                <Typography variant={'subtitle1'}>{ `$${ 186.56 }` }</Typography>
            </Grid>

        </Grid>
    );
};