import {NextPage} from "next";
import {useProducts} from "../../hooks";
import {ShopLayout} from "../../components/layouts";
import {Typography} from "@mui/material";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import {ProductList} from "../../components/products";

const WomenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women');

    return (
        <ShopLayout title={'Tekium Shop - Women'} pageDescription={'Encuentra los productos mas novedosos aqui para mujeres'}>
            <Typography variant='h1' component='h1'>Mujeres</Typography>
            <Typography variant='h2' sx={{mb: 1}}>Productos para Mujeres</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={ products }/>
            }

        </ShopLayout>
    )
}

export default WomenPage