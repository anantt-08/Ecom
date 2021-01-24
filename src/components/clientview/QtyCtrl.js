import React,{useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { FullscreenExit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width:40,
    height:40,
    margin:5, 
    fontSize:32, 
    
},
  divcontainer:{
   display:'flex',
   flexDirection:'row'
   


  },
  
}));

   function QtyCtrl(props){
    const classes = useStyles();
    const [counter,setCounter]=useState(props.value)
    
    const handleIncreament=()=>{
      var qty=counter+1
      setCounter(qty)
      props.onChange(qty)
  
  }
  const handleDecreament=()=>{
     if(counter>=1) 
  {  var qty=counter-1   
    setCounter(qty)
      props.onChange(qty)
}

     
}

return(<div>
      <div className={classes.divcontainer}>
   <Avatar className={classes.purple} onClick={()=>handleIncreament()}>+</Avatar>
  <span style={{margin:15}}>{counter}</span>
   <Avatar className={classes.purple} onClick={()=>handleDecreament()}>-</Avatar>
   </div>

  </div>)


}

export {QtyCtrl }
