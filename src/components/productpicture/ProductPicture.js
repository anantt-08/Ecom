import React,{useState,useCallback,createRef,useEffect,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {postData,postDataAndImage,getData, ServerURL}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'
import DropzoneComponent from 'react-dropzone-component';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:30,
      },
      paperStyle:{
        width:window.innerWidth*0.45,
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
       width:160,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  }));

function ProductPictureInterface(){
  const classes=useStyles();
  const [getProductId,setProductId]=useState('')
  const [getBrandId,setBrandId]=useState('')
  const [getCategoryId,setCategoryId]=useState('')
  const [getModelId,setModelId]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getCategoryList,setCategoryList]=useState([])
  const [getBrandList,setBrandList]=useState([])
  const [getModelList,setModelList]=useState([])
  const [getProductList,setProductList]=useState([])
  const [getErrCategoryId,setErrCategoryId]=useState('')
  const [getErrBrandId,setErrBrandId]=useState('')
  const [getErrModelId,setErrModelId]=useState('')
  const [getErrProductId,setErrProductId]=useState('')
  const [getErrFiles,setErrFiles]=useState('')
 //var dropzone=null;
  var dref=createRef()
  

var djsConfig={
  addRemoveLinks:true,
  acceptedFiles:"image/jpeg,image/png,image/gif",
  autoProcessQueue:false,
  uploadMultiple:true,

}

var componentConfig={
   iconFiletypes:['.jpg','.png','.gif'],
   showFiletypeIcon:true,
   postUrl:`${ServerURL}/productpicture/addpic`,

};
const sending=async(file,x,formData) =>{
   console.log("File SEnder")
}
const success=(file) =>{ console.log("Success")}

const removedfile = file => console.log('removing...', file);
const callback = () => console.log('Hello!');

const callbackArray = [
  function () {
      console.log('Look Ma, I\'m a callback in an array!');
  },
  function () {
      console.log('Wooooow!');
  }
];



const eventHandlers={
    drop:callbackArray,
    addedfile:callback,
    success:success,
    removedfile:removedfile,
    sending:sending,
}

const fetchCategory=async()=>{
    var list=await getData('category/displayall')
    setCategoryList(list)
    }
 
    useEffect(function(){
       fetchCategory()
 },[])

 

 const handleCategory=(event)=>{
    setCategoryId(event.target.value)
    var catid=event.target.value
    fetchBrand(catid)
  }
   
  const fetchBrand=async(catid)=>{
  var   list=await postData('brand/displaybyid',{categoryid:catid})
  setBrandList(list)
  }
  const handleBrand=(event)=>{
    setBrandId(event.target.value)
    var brid=event.target.value
    fetchModel(brid)
  }
   
  const fetchModel=async(brid)=>{
  var   list=await postData('model/displaybyid',{brandid:brid})
  setModelList(list)
  }
  const handleModel=(event)=>{
      setModelId(event.target.value)
     var modid=event.target.value
     fetchProduct(modid)
 }

  const fetchProduct=async(modid)=>{
    var   list=await postData('product/displaybymodelid',{modelid:modid})
    setProductList(list)
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
   const fillBrand=()=>{
    return getBrandList.map(function(item,key){
      return (
          <MenuItem  value={item.brandid}>
           {item.brandname}
          </MenuItem>
      )
    })
   }

   const fillModel=()=>{
    return getModelList.map(function(item,key){
      return (
          <MenuItem  value={item.modelid}>
           {item.modelname}
          </MenuItem>
      )
    })
   }

   const fillProduct=()=>{
    return getProductList.map(function(item,key){
      return (
          <MenuItem  value={item.productid}>
           {item.productname}
          </MenuItem>
      )
    })
   }

const  handlePost=async()=>{
  var err=false
 if(!checkRequire(getCategoryId))
 { err=true
   setErrCategoryId('/images/cross.png') }
 if(checkRequire(getCategoryId))
 { setErrCategoryId('/images/tick.png')}

 if(!checkRequire(getBrandId))
 { err=true
   setErrBrandId('/images/cross.png') }
 if(checkRequire(getBrandId))
 { setErrBrandId('/images/tick.png')}

 if(!checkRequire(getModelId))
 { err=true
   setErrModelId('/images/cross.png') }
 if(checkRequire(getModelId))
 { setErrModelId('/images/tick.png')}

 if(!checkRequire(getProductId))
 { err=true
   setErrProductId('/images/cross.png') }
 if(checkRequire(getProductId))
 { setErrProductId('/images/tick.png')}

 if(!checkRequire(dref.current.state.files))
 { err=true
   setErrFiles('/images/cross.png') }
 if(checkRequire(dref.current.state.files))
 { setErrFiles('/images/tick.png')}

  if(!err){
  console.log(dref)
  console.log(dref.current.files)
   var formData=new FormData()
   formData.append('productid',getProductId)
   dref.current.state.files.map((file,index)=>{
       formData.append('pictures'+index,file)
   }
 )
 const config={headers:{'content-type':'multipart/form-data'}}
  let result=await postDataAndImage('productpicture/addpicinfo',formData,config)
  console.log(result)
  if(result){
    setMsg("Pictures Uploaded")
    }
    else{
        setMsg("Fail to Uploaded Pictures") 
    }
}
else{
   setMsg("Error in Input") 
}
  //dropzone.processQueue();
}
  const ClearData=()=>{
    setProductId('')
    setCategoryId('')
    setBrandId('')
    setModelId('')
    setErrCategoryId('')
    setErrBrandId('')
    setErrModelId('')
    setErrProductId('')
    setErrFiles('')
  }



 return(
 <div className={classes.root}>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
    <Typography variant="h6" gutterBottom>
     Add  Product Pictures
      </Typography>
     </Paper>
     <Grid container spacing={1}>
     <Grid item xs={6} className={classes.subclass}>
      <img src={getErrCategoryId} width='10' height='10' />
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
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
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrBrandId} width='10' height='10' />
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getBrandId}
         onChange={(event)=>handleBrand(event)}
        > 
          {fillBrand()}
        </Select>
      </FormControl>
        </Grid>  
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrModelId} width='10' height='10' />
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Model Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getModelId}
         onChange={(event)=>handleModel(event)}
         >  
         {fillModel()}
        </Select>
      </FormControl>
        </Grid>  
         <Grid item xs={6} className={classes.subclass} > 
             <img src={getErrProductId} width='10' height='10' />
             <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getProductId}
         onChange={(event)=>setProductId(event.target.value)}
         >  
         {fillProduct()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={12} style={{marginTop:10}}> 
         <img src={getErrFiles} width='10' height='10' />
         <DropzoneComponent ref={dref}
         config={componentConfig}   
        eventHandlers={eventHandlers}
         djsConfig={djsConfig}    />
            
         </Grid>
         
         
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handlePost()}>
          Save
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()} >
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
 );

}


export default ProductPictureInterface;