import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import {getData, ServerURL ,postData,postDataAndImage}  from '../FetchNodeServices'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {checkRequire} from '../Checks'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    } ,
    tableDiv:{
       width:window.innerWidth*0.41,
    },
    avatortheme:{
     width:50,
     height:50,
   }, paperStyle:{
     width:480,
     padding:20,
     margin:20,
     backgroundColor:'#f1f2f6'
   },
   paperHeading :{
     margin:10,
     padding:10,
     display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#dfe4ea'
   },
   subclass:{
     marginTop:3,
     marginBottom:4,
     display:'flex',
     flexDirection:'row'
   },
   input:
   {
   display: 'none',
   
   },
   button: {
   margin: theme.spacing(1),
    width:200,
   },
   main:{
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
   } ,
   center:{
   display:'flex',
   alignItems:'center',
   justifyContent:'center',
   flexDirection:'row'
   },
   formControl: {
    // margin: theme.spacing(1),
   },
   })
   )


  function DisplayAllModel(){
    const classes=useStyles()
    const [getModelId,setModelId]=useState('')
    const [getCategory,setCategory]=useState('')
    const [getModel,setModel]=useState('')
    const [getBrandId,setBrandId]=useState(3)
    const [getDescription,setDescription]=useState('')
    const [getList,setList]=useState([])
    const [getOpen,setOpen]=useState('')
    const [getErrCat,setErrCat]=useState('')
    const [getErrBr,setErrBr]=useState('')
    const [getErrModel,setErrModel]=useState('')
    const [getErrDes,setErrDes]=useState('')
    const [getCategoryList,setCategoryList]=useState([])
    const [getBrandList,setBrandList]=useState([])
    const [getMsg,setMsg]=useState('')



    const [state, setState] = useState({
        columns: [
          { title: 'Id', field: 'modelid' },
          { title: 'Brand Id', field: 'brandid' },
          { title: 'Name', field: 'modelname' },
          { title: 'Description', field: 'description' },
        ],  
      });

      const fetchData=async()=>{
        var list =await getData('model/displayall')
        setList(list)
    }
    
     useEffect(function(){
        fetchData()
        fetchCategory()
    },[])
    
    const fetchCategory=async()=>{
        var list=await getData('category/displayall')
        setCategoryList(list)
        }
         
    
    const fillCategories=()=>{
        return getCategoryList.map(function(item,key){
          return (
              <MenuItem  value={item.categoryid}>
               {item.categoryname}
              </MenuItem>
          )
        })
        
       }
       
       const handleCategory=(event)=>{
         var catid=event.target.value
         setCategory(catid)
         fetchBrand(catid)
       }

       const fetchBrand=async(catid)=>{
           var body={categoryid:catid}
           var list=await postData('brand/displaybyid',body)
           console.log(list)
           setBrandList(list)
           }

       const fillBrand=()=>{
               return getBrandList.map(function(item,key){
                 return (
                     <MenuItem  value={item.brandid}>
                      {item.brandname}
                     </MenuItem>
                 )
               })
        }

        
        const handleBrand=(event)=>{
            setBrandId(event.target.value)

          }
      
       const handleEdit=async()=>{
       var  err=false
        if(!checkRequire(getCategory)){
           err=true
           setErrCat('/images/cross.png')
       }
       if(checkRequire(getCategory)){
          setErrCat('/images/tick.png')
      }
  
      if(!checkRequire(getBrandId)){
          err=true
          setErrBr('/images/cross.png')
      }
      if(checkRequire(getBrandId)){
         setErrBr('/images/tick.png')
      }

      if(!checkRequire(getModel)){
       err=true
       setErrModel('/images/cross.png')
      }
      if(checkRequire(getModel)){
      setErrModel('/images/tick.png')
       }  
  
      if(!checkRequire(getDescription)){
          err=true
          setErrDes('/images/cross.png')
      }
      if(checkRequire(getDescription)){
         setErrDes('/images/tick.png')
      }


        if(!err){
        var body={brandid:getBrandId,modelname:getModel,description:getDescription,modelid:getModelId}
        var result=await postData('model/updateRecord',body)
        if(result){
           setMsg("Record Edited..")
           }
           else{
           setMsg("Fail To Edit Record..")
           }
       }
       else {
           setMsg("Error in Input")
       }

       }

      const handleDelete=async(oldData)=>{
        var body={modelid:oldData.modelid}
        var result=await postData('model/deleteRecord',body)
      }
      
      const handleClickOpen = async(rowData) => {
        var result=await postData('brand/displaybybrandid',{brandid:rowData.brandid})
        setCategory(result[0].categoryid)
        fetchBrand(result[0].categoryid)
        setOpen(true);
        setModelId(rowData.modelid)
        setModel(rowData.modelname)
        setDescription(rowData.description)
        setBrandId(rowData.brandid)
       };
       
       const handleClose = () => {
        setOpen(false);
        setMsg('')
        setErrCat('')
        setErrDes('')
        setErrModel('')
        setErrBr('')
        fetchData()
       };
          
       const handleDialog=()=>{
        return (
          <div>
            <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Model [Edit Record]</DialogTitle>
              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <div className={classes.main}>
            <Paper className={classes.paperStyle}>
      <Grid container spacing={1}>
      <Grid item xs={12} className={classes.subclass} > 
             <img src='/images/tick.png' width='10' height='10' />
             <TextField fullWidth label='Model Id'value={getModelId}  variant='standard' onChange={(event)=>setModel(event.target.value)}/>
         </Grid>
       <Grid item xs={6} className={classes.subclass} > 
             <img src={getErrCat} width='10' height='10' />
             <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={getCategory}
          onChange={(event)=>handleCategory(event)}
        >
           
          {fillCategories()}
        </Select>
      </FormControl> 
         </Grid>
        <Grid item xs={6} className={classes.subclass} > 
             <img src={getErrBr} width='10' height='10' />
             <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" >Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          value={getBrandId}
          onChange={(event)=>handleBrand(event)}
        > 
        
          {fillBrand()}
        </Select>
      </FormControl> 
       </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrModel} width='10' height='10' />
             <TextField fullWidth label='Model Name'value={getModel}  variant='standard' onChange={(event)=>setModel(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrDes} width='10' height='10' />
             <TextField fullWidth label='Description'value={getDescription}  variant='standard' onChange={(event)=>setDescription(event.target.value)}/>
         </Grid>
        
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()} >
          Save
         </Button>
        </Grid>
        <Grid item xs={12} className={classes.subclass}>
          <div>
            <b>Message : {getMsg}</b> 
          </div>
        </Grid>
      </Grid>
     </Paper>
          
        </div> 
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
       }
      

    return(
        <div className={classes.root}>
        <div className={classes.tableDiv} >
       <MaterialTable style={{backgroundColor:'#ecf0f1'}}
         title="Model List"
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
               }, 300);
             }),
         }}
       />
       {handleDialog()}
       </div>
       </div>
    

   )

  }

  export default DisplayAllModel;