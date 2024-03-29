
import { FC, useEffect, useReducer } from "react";
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from "./";
import { ICartProduct } from "../../interfaces";

interface Props {
    children: React.ReactNode;
}

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number,
    subTotal: number,
    tax: number,
    total: number
    isLoaded: boolean;
    shippingAddress?: ShippingAddress,
}

export interface ShippingAddress {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    isLoaded: false,
    shippingAddress: undefined
};


export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);


    useEffect(() => {

        if ( Cookie.get('firstName')){
            const shippingAddress = {
                firstName : Cookie.get('firstName') || '',
                lastName  : Cookie.get('lastName') || '',
                address   : Cookie.get('address') || '',
                address2  : Cookie.get('address2') || '',
                zip       : Cookie.get('zip') || '',
                city      : Cookie.get('city') || '',
                country   : Cookie.get('country') || '',
                phone     : Cookie.get('phone') || '',
            }

            dispatch({ type:'[Cart] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);

    useEffect(() => {

        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => ( current.price * current.quantity ) + prev, 0 );
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0 );

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: ( subTotal * taxRate ),
            total: ( subTotal + ( subTotal * taxRate ) ),
        }

        // console.log('Order Items Summary: ', { orderSummary });
        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });

    }, [state.cart]);


    const addProductToCart = ( product: ICartProduct ) => {

        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.size !== product.size ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('firstName',address.firstName);
        Cookie.set('lastName',address.lastName);
        Cookie.set('address',address.address);
        Cookie.set('address2',address.address2 || '');
        Cookie.set('zip',address.zip);
        Cookie.set('city',address.city);
        Cookie.set('country',address.country);
        Cookie.set('phone',address.phone);

        dispatch({ type: '[Cart] - Update Address', payload: address });
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress
        }}>
            { children }
        </CartContext.Provider>
    );
};
