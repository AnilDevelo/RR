import React, { useState } from 'react';  
import { TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';  
import SearchIcon from '@mui/icons-material/Search';  

const DynamicSearchInput = ({ onSearch }) => {  
    const [searchTerm, setSearchTerm] = useState('');  

    const handleInputChange = (event) => {  
        setSearchTerm(event.target.value);  
    };  

    const handleSearch = () => {  
        if (onSearch) {  
            onSearch(searchTerm.trim());  
        }  
    };  

    return (  
        
        <Tooltip title="Search">  
            <TextField  
                variant="outlined"  
                placeholder="Search"  
                value={searchTerm}  
                onChange={handleInputChange}  
                onKeyPress={(event) => {  
                    if (event.key === 'Enter') {  
                        handleSearch();  
                    }  
                }}  
                InputProps={{  
                    startAdornment: (  
                        <InputAdornment position="start">  
                            <IconButton  
                                onClick={handleSearch}  
                                aria-label="search"  
                                size="small"  
                            >  
                                <SearchIcon fontSize="small" />  
                            </IconButton>  
                        </InputAdornment>  
                    ),  
                }}  
                sx={{  
                    borderRadius: '4px',  
                    backgroundColor: 'white', 
                     
                    border: '1px solid lightgray', // Add border  
                    '&:hover': {  
                        borderColor: 'gray', // Change border color on hover  
                    },  
                    '& .MuiOutlinedInput-root': {  
                        '& fieldset': {  
                            borderColor: 'transparent', // Set initial border color  
                        },  
                        '&:hover fieldset': {  
                            borderColor: 'gray', // Border color on hover  
                        },  
                        '&.Mui-focused fieldset': {  
                            borderColor: 'blue', // Border color when focused  
                        },  
                    },  
                }}  
            />  
        </Tooltip>  
    );  
};  

export default DynamicSearchInput;