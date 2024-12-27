// import React from "react";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import {makeStyles, withStyles} from "@material-ui/core/styles";
// import InputBase from "@material-ui/core/InputBase";

// const useStyles = makeStyles((theme) => ({
//     margin: {
//         minWidth: 150,
//         margin: '0'
//     },
// }));

// const BootstrapInput = withStyles((theme) => ({
//     root: {
//         'label + &': {
//             marginTop: theme.spacing(3),
//         },
//     },
//     input: {
//         borderRadius: 4,
//         position: 'relative',
//         backgroundColor: theme.palette.background.paper,
//         border: '1px solid #ced4da',
//         fontSize: 14,
//         padding: '15px 26px 15px 12px',

//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         '&:focus': {
//             borderRadius: 4,
//             borderColor: '#1976d2',
//             outlineWidth: '1px',
//             boxShadow: 'none',
//             outline: '1px solid #1976d2'
//         },
//     },
//     svg: {
//         right: '11px'
//     }
// }))(InputBase);

// const ExportDropdown = ({ option, name, userProps, handleOpenModal, totalUser }) => {
//     const classes = useStyles();
//     const { filterData, setFilterData, pagination, setPagination } = userProps;
//     const handleClick = (e) => {
//         let val = e.target.getAttribute("data-value");
//         let name = e.target.getAttribute("name");
//         handleChange(val,name)
//       };
//     const handleChange = (value,name) => {
//         switch (value) {
//             case 'CSV File': {
//                 let payload = {
//                     ...userProps,
//                     csvDownload: true,
//                     exportFile: true,
//                     [name]: value
//                 }
//                 handleOpenModal('ExportFilePopup', { userProps: payload, totalUsers:totalUser?.totalUser })
//                  setFilterData({ ...filterData, [name]: value })
//                 break;
//             }
//             case 'Excel File': {
//                 let payload = {
//                     ...userProps,
//                     csvDownload: false,
//                     exportFile: true,
//                     [name]: value
//                 }
//                 handleOpenModal('ExportFilePopup', { userProps: payload, totalUsers:totalUser?.totalUser })
//                 setFilterData({ ...filterData,  [name]: value });
//                 break;
//             }
//             default: {
//                 setFilterData({ ...filterData, csvDownload: false, exportFile: false, [name]: value })
//                 break;
//             }
//         }
//     };

//     return (
//         <div className={'filter_export_details_dropDown'}>
//             <FormControl className={classes.margin}>
//                 <Select
//                     name={name}
//                     value={filterData?.exportFileName}
//                     // onChange={handleChange}
//                     input={<BootstrapInput />}
//                     className={'filter_dropdown_list'}
//                 >
//                     {
//                         option?.map(item => {
//                             return <MenuItem onClick={handleClick} name={name} value={item} className={'filter_dropdown_list'}>{item}</MenuItem>
//                         })
//                     }
//                 </Select>
//             </FormControl>
//         </div>
//     )
// }
// export default ExportDropdown

import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  margin: {
    minWidth: 150,
    margin: "0",
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "15px 26px 15px 12px",

    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1976d2",
      outlineWidth: "1px",
      boxShadow: "none",
      outline: "1px solid #1976d2",
    },
  },
  svg: {
    right: "11px",
  },
}))(InputBase);

const ExportDropdown = ({
  option,
  name,
  exportProps,
  handleOpenModal,
  isGSTHistory,
}) => {
  const classes = useStyles();
  const { filterData, setFilterData, pagination, setPagination } = exportProps;
  const handleClick = (e) => {
    let val = e.target.getAttribute("data-value");
    let name = e.target.getAttribute("name");
    handleChange(val, name);
  };
  const handleChange = (value, name) => {
    if (isGSTHistory) {
      switch (value) {
        case "CSV File": {
          setFilterData({
            ...filterData,
            csvDownload: true,
            exportFile: true,
            [name]: value,
          });
          break;
        }
        case "Excel File": {
          setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: true,
            [name]: value,
          });
          break;
        }
        default: {
          setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: false,
            [name]: value,
          });
        }
      }
    } else {
      switch (value) {
        case "CSV File": {
          let payload = {
            ...exportProps,
            csvDownload: true,
            exportFile: true,
            [name]: value,
          };
          handleOpenModal("ExportFilePopup", {
            exportProps: payload,
            totalDocs: exportProps?.totalDocs,
          });
          setFilterData({ ...filterData, [name]: value });
          break;
        }
        case "Excel File": {
          let payload = {
            ...exportProps,
            csvDownload: false,
            exportFile: true,
            [name]: value,
          };
          handleOpenModal("ExportFilePopup", {
            exportProps: payload,
            totalDocs: exportProps?.totalDocs,
          });
          setFilterData({ ...filterData, [name]: value });
          break;
        }
        default: {
          setFilterData({
            ...filterData,
            csvDownload: false,
            exportFile: false,
            [name]: value,
          });
          break;
        }
      }
    }
  };

  return (
    <div className={"filter_export_details_dropDown"}>
      <FormControl className={classes.margin}>
        <Select
          name={name}
          value={filterData?.exportFileName}
          //onChange={handleChange}
          input={<BootstrapInput />}
          className={"filter_dropdown_list"}
        >
          {option?.map((item) => {
            return (
              <MenuItem
                key={item}
                onClick={handleClick}
                name={name}
                value={item}
                className={"filter_dropdown_list"}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
export default ExportDropdown;
