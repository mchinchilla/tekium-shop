import {useContext} from "react";

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import {UiContext} from "../../context";
import {useRouter} from "next/router";


export const SideMenu = () => {

    const router = useRouter();

    const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

    const navigateTo = (url: string) => {
        toggleSideMenu();
        router.push(url);
    }


    return (
        <Drawer
            open={ isMenuOpen }
            anchor='right'
            sx={{backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out'}}
            onClose={ toggleSideMenu }
        >
            <Box sx={{width: 250, paddingTop: 5}}>
                <List>
                    <ListItem>
                        <Input
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                    >
                                        <SearchOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'}/>
                    </ListItem>


                    <ListItem
                        button
                        sx={{display: {xs: '', sm: 'none'}}}
                        onClick={() => navigateTo('/category/men')}
                    >
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'}/>
                    </ListItem>

                    <ListItem
                        button
                        sx={{display: {xs: '', sm: 'none'}}}
                        onClick={() => navigateTo('/category/women')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'}/>
                    </ListItem>

                    <ListItem
                        button
                        sx={{display: {xs: '', sm: 'none'}}}
                        onClick={() => navigateTo('/category/kids')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Niños'}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'}/>
                    </ListItem>

                    {/* Admin */}
                    <Divider/>
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Productos'}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'}/>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'}/>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}