import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';

import {IProduct} from "../../interfaces";
import {Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Rating, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

export const ProductCard: FC<Props> = ({product}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`
        }, [isHovered, product.images]);

    return (
        <Grid item xs={6} sm={4}
              onMouseEnter={ () => setIsHovered(true) }
              onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
                <NextLink href={ `/product/${ product.slug }` } passHref prefetch={ false } legacyBehavior >
                    <Link>
                        <CardActionArea>
                            {
                                (product.inStock === 0) && (

                                    <Chip
                                        color="primary"
                                        label='No disponible'
                                        sx={{position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
                                    />
                                )
                            }
                            <CardMedia
                                component='img'
                                image={productImage}
                                alt={product.title}
                                className='fadeIn'
                                onLoad={() => setIsImageLoaded(true)}
                            >
                            </CardMedia>
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className={ 'fadeIn' }>
                <Typography fontWeight={700}>{ product.title }</Typography>
            </Box>
            <Box sx={{ display: isImageLoaded ? 'flex' : 'none' }} alignItems={'flex-start'} justifyContent={'space-between'} className={ 'fadeIn' }>
                <Typography fontWeight={600}>{ `$${product.price}` }</Typography>
                <StyledRating
                    name="product-rating"
                    defaultValue={0}
                    precision={0.1}
                    value={product.rate}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    readOnly
                />
            </Box>
        </Grid>
    );
};