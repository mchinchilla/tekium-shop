import {useRouter} from "next/router";
import {useContext, useState} from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import {AuthContext} from "../../context";

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter();

    const { loginUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);
    const [enableButton, setEnableButton] = useState(true);

    const onLoginUser = async ({ email, password }: FormData ) => {

        setShowError(false);
        setEnableButton(false);

        const isValidLogin = await loginUser(email, password);
        if(!isValidLogin) {
            setShowError(true);
            setEnableButton(true);
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }
        setEnableButton(true);

        const destination = router.query.p?.toString() || '/';
        router.replace(destination);

    }

  return (
      <>
          <AuthLayout title={'Ingresar'}>
              <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
                  <Box sx={{width: 350, padding: '10px 20px'}}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                              <Chip
                                    label="No reconocemos ese usuario / contraseña"
                                    color="error"
                                    icon={ <ErrorOutline /> }
                                    className="fadeIn"
                                    sx={{ display: showError ? 'flex' : 'none', borderRadius: '6px', marginTop: '4px' }}
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
                              <NextLink
                                  href={ router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register' }
                                  passHref
                              >
                                  <Link underline='always'>
                                      ¿No tienes cuenta?
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

 export default LoginPage;