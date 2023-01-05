import {ShopLayout} from "../../components/layouts";
import {Chip, Grid, Link, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import NextLink from "next/link";
import {DeleteOutline, EditOutlined, PaymentOutlined} from "@mui/icons-material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Muestra la información de si la orden fue pagada o no',
        width: 120,
        renderCell: ( params: GridValueGetterParams ) => {
            return params.row.paid
                ? <Chip color={'success'} label={'Pagada'} variant={'outlined'} size={'small'} />
                : <Chip color={'error'} label={'Pendiente'} variant={'outlined'} size={'small'} />;
        }
    },
    {
        field: 'actions',
        headerName: 'Acciones',
        description: 'Muestra las acciones que se pueden realizar sobre la orden',
        width: 100,
        sortable: false,
        renderCell: ( params: GridValueGetterParams ) => {
            return <Grid container justifyContent={'space-between'} display={'flex'}>
                <Grid item>
                    <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                        <Link>
                            <EditOutlined />
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item>
                    <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior >
                        <Link>
                            <DeleteOutline />
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item>
                    <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior >
                        <Link>
                            <PaymentOutlined />
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        }
    }
];

const rows = [
    { id: 1, paid: true, fullname: 'Marvin Chinchilla' },
    { id: 2, paid: true, fullname: 'Juan Perez' },
    { id: 3, paid: false, fullname: 'Pedro Flores' },
    { id: 4, paid: true, fullname: 'Juanito Caceres' },
    { id: 5, paid: false, fullname: 'Mario Chavez' },
];

const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de Ordenes'} pageDescription={'Historial de Ordenes de Cliente'}>
            <Typography variant='h1' component="h1">Historial de Ordenes</Typography>

            <Grid container >
                <Grid item xs={12} sx={{ height:650, width:'100%' }}>
                    <DataGrid
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10, 50, 100] }
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default HistoryPage;