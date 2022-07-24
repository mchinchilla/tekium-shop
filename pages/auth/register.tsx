import {useContext, useState} from "react";
import {useRouter} from "next/router";
import NextLink from "next/link";

import {AuthLayout} from "../../components/layouts";
import {Box, Button, Chip, Grid, Link, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {tekiumApi} from "../../api";
import { validations } from "../../utils";
import {ErrorOutline, InfoOutlined} from "@mui/icons-material";
import {AuthContext} from "../../context";

type FormData = {
    name: string,
    email: string,
    password: string,
};


const RegisterPage = () => {

    const { registerUser } = useContext(AuthContext);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [enableButton, setEnableButton] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');

    const onRegisterForm = async ({name, email, password}: FormData) => {

        setShowError(false);
        setEnableButton(false);
        setResponseMessage('');

        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setResponseMessage( message );
            setShowError(true);
            setEnableButton(true);
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return;
        }

        setEnableButton(true);
        setShowSuccess(true);
        setResponseMessage(message);
        setTimeout(() => { setShowSuccess(false) }, 3000);

        router.replace('/');

    }


    return (
        <>
            <AuthLayout title={'Ingresar'}>
                <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                    <Box sx={{width: 350, padding: '10px 20px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                                <Chip
                                    label={ responseMessage }
                                    color="error"
                                    icon={<ErrorOutline/>}
                                    className="fadeIn"
                                    sx={{ display: showError ? 'flex' : 'none', borderRadius: '6px', marginTop: '4px' }}
                                />
                                <Chip
                                    label={ responseMessage }
                                    color="success"
                                    icon={ <InfoOutlined /> }
                                    className="fadeIn"
                                    sx={{ display: showSuccess ? 'flex' : 'none', borderRadius: '6px', marginTop: '4px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={'Nombre Completo'}
                                    variant={'filled'}
                                    fullWidth
                                    { ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                                    })}
                                    error={ !!errors.name }
                                    helperText={ errors.name?.message }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type={'email'}
                                    label={'Correo'}
                                    variant={'filled'}
                                    fullWidth
                                    { ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail  // ~ validate: (val) => validations.isEmail(val)
                                    })}
                                    error={ !!errors.email }
                                    helperText={ errors.email?.message }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={'Password'}
                                    variant={'filled'}
                                    fullWidth
                                    type={'password'}
                                    { ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'El password debe tener al menos 6 caracteres' },
                                    })}
                                    error={ !!errors.password }
                                    helperText={ errors.password?.message }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type={'submit'}
                                    color={'secondary'}
                                    size={'large'}
                                    fullWidth
                                    className='circular-btn'
                                    disabled={ !enableButton }
                                >
                                    Ingresar
                                </Button>
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                                <NextLink href='/auth/login' passHref>
                                    <Link underline='always'>
                                        ¿Ya tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </AuthLayout>
        </>
    );
};

export default RegisterPage;