import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import {getData,postData,postDataAndImage,ServerURL}  from '../FetchNodeServices'
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
 
 
import {checkRequire} from '../Checks'

const useStyles = makeStyles((theme) => ({
  rootx:{display:'flex',
    marginTop:40,
      alignItems:'center',
    justifyContent:'center'    
},
tablediv:{
    width:'auto',
    height:'auto',
   
},
root: {
      
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  marginTop:10 
},
paperstyle:{
width:450,
margin:5,
padding:20,
backgroundColor:'#f5f6fa'

},
headstyle:{
    display:'flex',
    margin:10,
    padding:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f1f2f6'
    },


button: {
    margin: theme.spacing(1),
    width:160,
  },
  input: {
    display: 'none',
  },
  container:{
 justifyContent:'center',
 alignItems:'center',
 display:'flex',
  },
  gridStyle:{display:'flex',flexDirection:'row'},
 

}

));
export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'categoryid',editable: 'never' },
      { title: 'Name', field: 'categoryname',editable: 'never' },
      { title: 'Description', field: 'description',editable: 'never'},
      { title: 'Icon',field: 'icon',editable: 'never',
        render: rowData=><div><Avatar variant='rounded' src={`${ServerURL}/images/${rowData.icon}`}  /></div>
       },
      { title: 'Ad',field: 'ad',editable: 'never',
        render: rowData=><div><Avatar variant='rounded' src={`${ServerURL}/images/${rowData.ad}`}  /></div>
       },
      { title: 'Status',field: 'adstatus',editable: 'never'},
    ]
  });

  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getCategoryId,setCategoryId]=useState('')
  const [getAdStatus,setAdStatus]=useState('')
  const [getCategoryName,setCategoryName]=useState('')
  const [getDescription,setDescription]=useState('')
  const [getIcon,setIcon]=useState({icon:'',fileicon:''})
  const [getAd,setAd]=useState({ad:'',filead:''})
  const [getMsg,setMsg]=useState('')
  const [getErrorCn,setErrorCn]=useState('')
  const [getErrorDes,setErrorDes]=useState('')
  const [getErrorIcon,setErrorIcon]=useState('')
  const [getErrorAd,setErrorAd]=useState('')
  const [getErrorAdStatus,setErrorAdStatus]=useState('')
 
 const fetchData=async()=>{
   let list=await getData('category/displayall')
       setList(list)
   
 }
 useEffect(function(){
 
 
fetchData()

 },[])
 const handleClickOpen = (rowData) => {
  setOpen(true);
  setCategoryId(rowData.categoryid)
  setCategoryName(rowData.categoryname)
  setDescription(rowData.description)
  setIcon({icon:'',fileicon:`${ServerURL}/images/${rowData.icon}`})
  setAd({ad:'',filead:`${ServerURL}/images/${rowData.ad}`})
  setAdStatus(rowData.adstatus)

};

const handleClose = () => {
  setOpen(false);
  fetchData()
};


const handleDelete=async(oldData)=>{
 let body={categoryid:oldData.categoryid}
 await postData('category/deleteRecord',body)


}

const handleIcon=(event)=>{
  setIcon({icon:event.target.files[0],fileicon:URL.createObjectURL(event.target.files[0])})

 }
 const handleAd=(event)=>{
  setAd({ad:event.target.files[0],filead:URL.createObjectURL(event.target.files[0])})

 }

  const handleChangeAdStatus=(event)=>{
   setAdStatus(event.target.value)

  }
 const ClearData=()=>{
 setCategoryName('')
 setDescription('')
 setIcon({icon:'',fileicon:''})
 setAd({ad:'',filead:''})
 setAdStatus('')
 setMsg('')
 setErrorCn('')
 setErrorDes('')
 setErrorAd('')
 setErrorAdStatus('')
 setErrorIcon('')
 }

const handleSubmit=async()=>{
  var err=false;
  if(!checkRequire(getCategoryName))
  {err=true
   setErrorCn('/images/cross.png')
  }
  if(checkRequire(getCategoryName))
  {setErrorCn('/images/tick.png')
  }

  if(!checkRequire(getDescription))
   { err=true
     setErrorDes('/images/cross.png')
    
  }

  if(checkRequire(getDescription))
   { 
     setErrorDes('/images/tick.png')
    }
/*
    if(!checkRequire(getIcon.icon))
    { err=true
      setErrorIcon('/images/cross.png')
     
   }

   if(checkRequire(getIcon.icon))
    { 
      setErrorIcon('/images/tick.png')
     }
   
     if(!checkRequire(getAd.ad))
     { err=true
       setErrorAd('/images/cross.png')
      
    }

    if(checkRequire(getAd.ad))
     { 
       setErrorAd('/images/tick.png')
      }
    
      if(!checkRequire(getAdStatus))
      { err=true
        setErrorAdStatus('/images/cross.png')
       
     }
 */
     if(checkRequire(getAdStatus))
      { 
        setErrorAdStatus('/images/tick.png')
       }
          


  if(!err)
  { 
  const formData=new FormData()
  formData.append('categoryid',getCategoryId)
 formData.append('categoryname',getCategoryName)
 formData.append('description',getDescription)
 formData.append('icon',getIcon.icon)
 formData.append('ad',getAd.ad)
 formData.append('adstatus',getAdStatus)
 const config={headers:{'content-type':'multipart/form-data'}}
 let result=await postDataAndImage('category/editRecord',formData,config)
 console.log(result)
 if(result)
 {setMsg("Record Updated...")}
 else
 {
   setMsg("Fail to Update Record..")
 }
}
}




const editDialog=()=>{
return(
<Dialog
        open={getOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Category Register [Edit Record]"}</DialogTitle>
        <DialogContent>
        <div className={classes.root}>
    <Paper className={classes.paperstyle}>
        
    <Grid container spacing={1}>
        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrorCn} width='10' height='10' />
        <TextField label="Category Name" value={getCategoryName} fullWidth onChange={(event)=>{setCategoryName(event.target.value)}} />
        </Grid>
        <Grid item xs={12} className={classes.gridStyle}>
        <img src={getErrorDes} width='10' height='10' />
        <TextField label="Description" value={getDescription} onChange={(event)=>{setDescription(event.target.value)}} fullWidth />
        </Grid>

        <Grid item xs={6} className={classes.gridStyle} >
        <img src={getErrorIcon} width='10' height='10' />  
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-fileicon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
      />
      <label htmlFor="contained-button-fileicon">
        <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
          Upload Icon
        </Button>
      </label>
 </Grid>
        <Grid item xs={6} className={classes.container}>
        <Avatar alt="Remy Sharp" variant='rounded'  style={{width:90,height:60}} src={getIcon.fileicon} />
        </Grid>


        <Grid item xs={6} className={classes.gridStyle} >
        <img src={getErrorAd} width='10' height='10' />  
         <input
        accept="image/jpeg"
        className={classes.input}
        id="contained-button-filead"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <label htmlFor="contained-button-filead">
        <Button variant="contained" color="primary" className={classes.button} component="span" startIcon={<CloudUploadIcon / >}>
          Upload Ad
        </Button>
      </label>
      </Grid>
        <Grid item xs={6} className={classes.container}>
        <Avatar alt="Remy Sharp" variant='rounded' style={{width:90,height:60}} src={getAd.filead} />
        </Grid>
        <Grid item xs={12} className={classes.gridStyle} >
        <img src={getErrorAdStatus} width='10' height='10' />  
        
        <div>Ad Status:</div>    
        <Radio
        checked={getAdStatus === 'Yes'}
        onChange={(event)=>handleChangeAdStatus(event)}
        value="Yes"
        name="radio-button-demo"
       // inputProps={{ 'aria-label': 'A' }}
      /> Yes
      <Radio
        checked={getAdStatus === 'No'}
        onChange={(event)=>handleChangeAdStatus(event)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      /> No
     
        </Grid>
       <Grid item xs={12}  className={classes.container}>

       <Button variant="contained" fullWidth  color="primary" onClick={()=>handleSubmit()}>Edit Above Data</Button>
       </Grid>
 

<Grid item xs={12}>

<b>Message:&nbsp;&nbsp;{getMsg}
</b>
</Grid>

        </Grid> 
    </Paper>

</div>
        </DialogContent>
        <DialogActions>
           
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>


)


}

  const classes = useStyles();
  return (
   
      <div className={classes.rootx}>
      <div className={classes.tablediv}>    
    <MaterialTable
      title="Category List"
      columns={state.columns}
      data={getList}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) => handleClickOpen(rowData)
        }
      ]}
      editable={{
        

       
       
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              
                const data = [...getList]
                data.splice(data.indexOf(oldData), 1);
                setList(data)
                handleDelete(oldData)
              
            }, 600);
          }),
      }}
    />
    </div>
    {editDialog()}
 </div>   
  );
}