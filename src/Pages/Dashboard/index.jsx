import React, { useState} from 'react';
import Paper from '@mui/material/Paper';
import newLogo from "../../assets/images/logo.png";
import { Box, Grid, Typography, Card, CardContent, Button, TextField, Snackbar, Alert } from '@mui/material';

function Dashboard() {
    const [walletBalance, setWalletBalance] = useState(10000);
    const [totalCommission, setTotalCommission] = useState(2500);
    const [withdrawalBalance, setWithdrawalBalance] = useState(5000);

    // State for deposit input and feedback
    const [depositAmount, setDepositAmount] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Handle adding deposit balance
    const handleAddDeposit = () => {
        if (!isNaN(depositAmount) && depositAmount > 0) {
            setWalletBalance(walletBalance + parseFloat(depositAmount));
            setDepositAmount('');
            setSnackbarOpen(true);
        } else {
            alert('Please enter a valid deposit amount.');
        }
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: 4, color: '#fff', minHeight: '100vh' }}>
        <Grid container spacing={4} justifyContent="center">
            {/* Total Wallet Balances */}
            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#292929', color: '#fff', textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)', borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d1d1d1' }}>Total Wallet Balances</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2, color: '#4caf50' }}>${walletBalance.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Total Commission */}
            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#292929', color: '#fff', textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)', borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d1d1d1' }}>Total Commission</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2, color: '#ff9800' }}>${totalCommission.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Total Withdrawal Balances */}
            <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#292929', color: '#fff', textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)', borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d1d1d1' }}>Total Withdrawal Balances</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2, color: '#f44336' }}>${withdrawalBalance.toFixed(2)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Add Deposit Balance */}
            {/* <Grid item xs={12}>
                <Card sx={{ backgroundColor: '#292929', color: '#fff', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)', borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#f5f5f5' }}>
                            Add Deposit Balance (Super Admin)
                        </Typography>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    label="Deposit Amount"
                                    type="number"
                                    fullWidth
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    InputProps={{ style: { color: '#fff' } }}
                                    InputLabelProps={{ style: { color: '#bbb' } }}
                                    sx={{ backgroundColor: '#3a3a3a', borderRadius: 1 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', height: '100%', borderRadius: 1 }}
                                    fullWidth
                                    onClick={handleAddDeposit}
                                >
                                    Add Deposit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid> */}
        </Grid>

        {/* Snackbar for success feedback */}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                Deposit added successfully!
            </Alert>
        </Snackbar>
    </Box>
    )
}
export default Dashboard;