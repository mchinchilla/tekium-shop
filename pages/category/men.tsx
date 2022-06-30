import {NextPage} from "next";
import {useProducts} from "../../hooks";
import {ShopLayout} from "../../components/layouts";
import {Typography} from "@mui/material";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import {ProductList} from "../../components/products";

const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men');

    return (
        <ShopLayout title={'Tekium Shop - Men'} pageDescription={'Encuentra los productos mas novedosos aqui para hombres'}>
            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{mb: 1}}>Productos para Hombres</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products }/>
            }

        </ShopLayout>
    )
}

export default MenPage