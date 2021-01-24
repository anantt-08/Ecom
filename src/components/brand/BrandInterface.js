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
import {postDataAndImage, getData}   from  '../FetchNodeServices'
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
    formControl: {
     // margin: theme.spacing(1),
    },
  }));

  function BrandInterface(){
   const classes=useStyles()
   const [getCategoryId,setCategoryId]=useState('')
   const [getBrand,setBrand]=useState('')
   const [getDescription,setDescription]=useState('')
   const [getAdStatus,setAdStatus]=useState('')
   const [getAd,setAd]=useState({ad:'',fileAd:''})
   const [getPicture,setPicture]=useState({pic:'',filePic:''})
   const [getTopBrand,setTopBrand]=useState('')
   const [getNewBrand,setNewBrand]=useState('')
   const [getMsg,setMsg]=useState('')
   const [getErrCat,setErrCat]=useState('')
   const [getErrBr,setErrBr]=useState('')
   const [getErrDes,setErrDes]=useState('')
   const [getErrPic,setErrPic]=useState('')
   const [getErrAd,setErrAd]=useState('')
   const [getErrAdstatus,setErrAdstatus]=useState('')
   const [getErrTb,setErrTb]=useState('')
   const [getErrNb,setErrNb]=useState('')
   const [getList,setList]=useState([])
   
   const fetchCategory=async()=>{
   var list=await getData('category/displayall')
   setList(list)
   }

   useEffect(function(){
      fetchCategory()
   },[])

   const fillCategories=()=>{
    return getList.map(function(item,key){
      return (
          <MenuItem  value={item.categoryid}>
           {item.categoryname}
          </MenuItem>
      )
    })
   }
   
   const handleCategory=(event)=>{
     setCategoryId(event.target.value)
   }

   const handleAd=(event)=>{
    setAd({ad:event.target.files[0],fileAd:URL.createObjectURL(event.target.files[0])})
   }
   
   const handlePicture=(event)=>{
     setPicture({pic:event.target.files[0],filePic:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit=async()=>{
     var err=false
     if(!checkRequire(getCategoryId)){
         err=true
         setErrCat('/images/cross.png')
     }
     if(checkRequire(getCategoryId)){
        setErrCat('/images/tick.png')
    }

    if(!checkRequire(getBrand)){
        err=true
        setErrBr('/images/cross.png')
    }
    if(checkRequire(getBrand)){
       setErrBr('/images/tick.png')
    }

    if(!checkRequire(getDescription)){
        err=true
        setErrDes('/images/cross.png')
    }
    if(checkRequire(getDescription)){
       setErrDes('/images/tick.png')
    }

    if(!checkRequire(getPicture.pic)){
        err=true
        setErrPic('/images/cross.png')
    }
    if(checkRequire(getPicture.pic)){
       setErrPic('/images/tick.png')
    }
    
    if(!checkRequire(getAd.ad)){
        err=true
        setErrAd('/images/cross.png')
    }
    if(checkRequire(getAd.ad)){
       setErrAd('/images/tick.png')
    }

    if(!checkRequire(getAdStatus)){
        err=true
        setErrAdstatus('/images/cross.png')
    }
    if(checkRequire(getAdStatus)){
       setErrAdstatus('/images/tick.png')
    }

    if(!checkRequire(getTopBrand)){
        err=true
        setErrTb('/images/cross.png')
    }
    if(checkRequire(getTopBrand)){
       setErrTb('/images/tick.png')
    }
    if(!checkRequire(getNewBrand)){
        err=true
        setErrNb('/images/cross.png')
    }
    if(checkRequire(getNewBrand)){
       setErrNb('/images/tick.png')
    }
     if(!err){
     var formData=new FormData()
     formData.append('categoryid',getCategoryId)
     formData.append('brandname',getBrand)
     formData.append('description',getDescription)
     formData.append('picture',getPicture.pic)
     formData.append('ad',getAd.ad)
     formData.append('adstatus',getAdStatus)
     formData.append('topbrands',getTopBrand)
     formData.append('newbrands',getNewBrand)
     var config={headers:{'content-type':'multipart/form-data'}}
     var result=await postDataAndImage('brand/addnewbrand',formData,config)
     console.log(result)
     if(result){
     setMsg("Record Submitted..")
     }
     else{
     setMsg("Fail To Submit..")
     } }

     else{
         setMsg('Error in Input')
     }

    }
  
    const ClearData=()=>{
        setCategoryId('')
        setBrand('')
        setDescription('')
        setPicture({pic:'',filepic:''})
        setAd({ad:'',fileAd:''})
        setAdStatus('')
        setTopBrand('')
        setNewBrand('')
        setMsg('')
        setErrCat('')
        setErrDes('')
        setErrNb('')
        setErrBr('')
        setErrTb('')
        setErrPic('')
        setErrAd('')
        setErrAdstatus('')
    }
     return(
        <div className={classes.root} >
          <Paper className={classes.paperStyle}>
         <Paper  elevation={1} className={classes.paperHeading} >
       <img src='/images/brand.jpg'   width='50' height='50' ></img>
      <Typography variant="h6" gutterBottom>
        Add Brand
      </Typography>
      </Paper>
      <Grid container spacing={1}>
       <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrCat} width='10' height='10' />
             <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCategoryId}
          onChange={(event)=>handleCategory(event)}
        >  
          {fillCategories()}
        </Select>
      </FormControl> 
         </Grid>
        <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrBr} width='10' height='10' />
             <TextField fullWidth label='Brand Name' value={getBrand}  variant='standard' onChange={(event)=>setBrand(event.target.value)}/>
         </Grid>
         <Grid item xs={12} className={classes.subclass} > 
             <img src={getErrDes} width='10' height='10' />
             <TextField fullWidth label='Description'value={getDescription}  variant='standard' onChange={(event)=>setDescription(event.target.value)}/>
         </Grid>
         <Grid item xs={6} className={classes.center}>
         <img src={getErrPic} width='10' height='10' />
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filepic"
        multiple
        type="file"
        onChange={(event)=>handlePicture(event)}
      />
      <label htmlFor="contained-button-filepic">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Picture
        </Button>
      </label>
         </Grid>
       <Grid item xs={6} className={classes.center} >
         <Avatar alt="Remy Sharp" variant='rounded' src={getPicture.filePic} className={classes.avatortheme}/>
        </Grid>
        <Grid item xs={6} className={classes.center} >
        <img src={getErrAd} width='10' height='10' />
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filead"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <label htmlFor="contained-button-filead">
        <Button variant="contained" color="primary"  className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Ad
        </Button>
      </label>
         </Grid>
       <Grid item xs={6}  className={classes.center}  >
         <Avatar alt="Remy Sharp" variant='rounded' src={getAd.fileAd} className={classes.avatortheme}/>
        </Grid>
       <Grid item xs={12} className={classes.subclass}>
        <img src={getErrAdstatus} width='10' height='10' />
         <div>Ad Status :
         </div>
       <Radio
        checked={getAdStatus === 'Yes'}
        onChange={(event)=>setAdStatus(event.target.value)}
        value="Yes"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getAdStatus === 'No'}
        onChange={(event)=>setAdStatus(event.target.value)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />No
        </Grid> 
        <Grid item xs={12} className={classes.subclass}>
        <img src={getErrTb} width='10' height='10' />
         <div>Top Brand :
         </div>
       <Radio
        checked={getTopBrand === 'Yes'}
        onChange={(event)=>setTopBrand(event.target.value)}
        value="Yes"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getTopBrand === 'No'}
        onChange={(event)=>setTopBrand(event.target.value)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />No
        </Grid> 
        <Grid item xs={12} className={classes.subclass}>
        <img src={getErrNb} width='10' height='10' />
         <div>New Brand :
         </div>
       <Radio
        checked={getNewBrand === 'Yes'}
        onChange={(event)=>setNewBrand(event.target.value)}
        value="Yes"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Yes
      <Radio
        checked={getNewBrand === 'No'}
        onChange={(event)=>setNewBrand(event.target.value)}
        value="No"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />No
        </Grid> 
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()}>
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



  export default BrandInterface;