import React from 'react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'

function Loader() {
    return (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <CircularProgress sx={{ my: 4 }} />
                <Typography>Chargement...</Typography>
            </Box>
        </Grid>
    )
}

export default Loader