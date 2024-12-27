import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const GenreTypeCheckbox = () => {
    const [checked, setChecked] = React.useState([true, false,false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked,event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };
    const handleChange4 = (event) => {
        setChecked([checked[0],checked[1], event.target.checked]);
    };
    const handleChange5 = (event) => {
        setChecked([checked[0],checked[1],checked[2], event.target.checked]);
    };
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Child 2"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
            <FormControlLabel
                label="Child 3"
                control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
            />
            <FormControlLabel
                label="Child 4"
                control={<Checkbox checked={checked[3]} onChange={handleChange5} />}
            />
        </Box>
    );

    return (
        <div>
            <FormControlLabel
                label="Parent"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1] && checked[2] && checked[3]}
                        indeterminate={checked[0] !== checked[3]}
                        onChange={handleChange1}
                    />
                }
            />
            {children}
        </div>
    );
}
export default GenreTypeCheckbox