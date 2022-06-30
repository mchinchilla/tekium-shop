import {NextPage} from "next";
import {useProducts} from "../../hooks";
import {ShopLayout} from "../../components/layouts";
import {Typography} from "@mui/material";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import {ProductList} from "../../components/products";

const KidsPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=kid');

    return (
        <ShopLayout title={'Tekium Shop - Kids'} pageDescription={'Encuentra los productos mas novedosos aqui para niños'}>
            <Typography variant='h1' component='h1'>Niños</Typography>
            <Typography variant='h2' sx={{mb: 1}}>Productos para Niños</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products }/>
            }

        </ShopLayout>
    )
}

export default KidsPage