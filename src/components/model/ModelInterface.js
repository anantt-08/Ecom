import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import {postDataAndImage, getData, postData}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'

const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:20,
      },
      paperStyle:{
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
      avatortheme:{
        width:50,
        height:50,
      },
    input:
     {
      display: 'none',

    },
    button: {
      margin: theme.spacing(1),
       width:200,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },
    }))


function ModelInterface(){
       const classes=useStyles()
       const [getCategory,setCategory]=useState('')
       const [getBrandId,setBrandId]=useState('')
       const [getModel,setModel]=useState('')
       const [getDescription,setDescription]=useState('')
       const [getErrCat,setErrCat]=useState('')
       const [getErrBr,setErrBr]=useState('')
       const [getErrModel,setErrModel]=useState('')
       const [getErrDes,setErrDes]=useState('')
       const [getCategoryList,setCategoryList]=useState([])
       const [getBrandList,setBrandList]=useState([])
       const [getMsg,setMsg]=useState('')

       const fetchCategory=async()=>{
        var list=await getData('category/displayall')
        setCategoryList(list)
        }
     
        useEffect(function(){
           fetchCategory()
        },[])
     
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
       
        const handleSubmit=async()=>{
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
         var body={brandid:getBrandId,modelname:getModel,description:getDescription}
         var result=await postData('model/addnewmodel',body)
         if(result){
            setMsg("Record Submitted..")
            }
            else{
            setMsg("Fail To Submit..")
            }
        }
        else {
            setMsg("Error in Input")
        }

        }
       
        const ClearData=()=>{
            setCategory('')
            setBrandId('')
            setModel('')
            setDescription('')
            setMsg('')
            setErrCat('')
            setErrDes('')
            setErrModel('')
            setErrBr('')
        }


    return(
        <div className={classes.root}>
            <Paper className={classes.paperStyle}>
         <Paper  elevation={1} className={classes.paperHeading} >
      <Typography variant="h6" gutterBottom>
        Add Model
      </Typography>
      </Paper>
      <Grid container spacing={1}>
       <Grid item xs={6} className={classes.subclass} > 
             <img src={getErrCat} width='10' height='10' />
             <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getBrandId}
          onChange={(event)=>setBrandId(event.target.value)}
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
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()} >
          Save
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()}>
          Reset
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
    )

}


export default ModelInterface;