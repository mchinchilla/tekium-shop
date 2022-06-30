import {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {AddCircleOutline, RemoveCircleOutline} from "@mui/icons-material";

interface Props {
    count: number;
}

export const ItemCounter: FC<Props> = ( { count } ) => {
    return (
        <Box display='flex' alignItems='center' >
            <IconButton>
                <RemoveCircleOutline/>
            </IconButton>
            <Typography variant='h6' component='h6' > { count } </Typography>
            <IconButton>
                <AddCircleOutline />
            </IconButton>
        </Box>
    );
};