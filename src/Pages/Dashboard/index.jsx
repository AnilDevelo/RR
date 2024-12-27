import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import newLogo from "../../assets/images/logo.png";

function Dashboard() {
    return (
        <Box sx={{ m: "32px 40px", borderRadius: 2, }} >
            <Paper variant="outlined">
                <Box  sx={{ p: "80px 32px", textAlign: 'center' }} className={"dashboard-section"} >
                    <img src={newLogo} alt={"Logo"} className={"Logo"} />
                    <Box component="h6" mt={4} sx={{color: "black"}}>Welcome to RR</Box>
                </Box>
            </Paper>
        </Box>
    )
}
export default Dashboard;