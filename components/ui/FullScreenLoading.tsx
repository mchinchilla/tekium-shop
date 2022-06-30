import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";


const FullScreenLoading = () => {
  return (
   <>
       <Box
           display='flex'
           flexDirection='column'
           justifyContent='center'
           alignItems='center'
           height='calc(100vh - 200px)'
       >
           <Typography variant='h2' component='h2' fontSize={30} fontWeight={200} sx={{ mb:3 }}>Cargando...</Typography>
           <CircularProgress
               thickness={ 4 }
               color='success'
           />
       </Box>
   </>
  );
 };

 export default FullScreenLoading;