import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

 export default function ListItems(props){
 
    const handleClick=(opt)=>{
      props.handleComponentsReference(opt)
    }

  return (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(1)} >
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(2)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Products" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(4)} >
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Product Pictures" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(5)}>
      <ListItemIcon>
      <TableChartIcon />
      </ListItemIcon>
      <ListItemText primary="Update Pictures" />
    </ListItem> 



    <ListItem button onClick={()=>handleClick(3)}>
      <ListItemIcon>
      <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

  }