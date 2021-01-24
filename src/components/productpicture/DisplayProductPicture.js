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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    root: {
       display:'flex',
       justifyContent:'center',
       alignItems:'center',
       marginTop:30,
      },
      tableDiv:{
        width:window.innerWidth*0.5,
     },
        paperStyle:{
        width:window.innerWidth*0.3,
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
       width:190,
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
  const [getPictureId,setPictureId]=useState('')
  const [getProductPictureList,setProductPictureList]=useState([])
  const [getProductPicture,setProductPicture]=useState({picture:'',filePic:''})
  const [getStatus,setStatus]=useState(true)
  const [getOpen,setOpen]=useState(false)
  const [state, setState] = useState({
    columns: [
      { title: 'Picture Id', field: 'pictureid' },
      { title: 'Product Id', field: 'productid' },
      { title: 'Product Name', 
      render: rowData=> <div> {rowData.productname}<br/>{rowData.offertype}</div>  },
      { title: 'Product Picture',   field: 'productpicture' ,
       render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.productpicture}`}
        className={classes.avatortheme}/></div> },

    ],  
  });

  
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
    var   list=await postData('product/displaybyid',{modelid:modid})
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

   
 const handleDelete=async(oldData)=>{
    var body={pictureid:oldData.pictureid}
    var result=await postData('productpicture/deleteRecord',body)
  }
  const handleClose = () => {
    setOpen(false);
    setProductPicture({filePic:'',picture:''})
    setMsg('')
    handleSearchProduct()
  };
  const handleClickOpen=(rowData)=>{
    setOpen(true)
    setProductId(rowData.productid)
    setProductPicture({picture:`${ServerURL}/images/${rowData.productpicture}`,filePic:''})
    setPictureId(rowData.pictureid)

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
  }

  const handleSearchProduct=async()=>{
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
    if(!err)   
    { var list=await postData('productpicture/displaybyid',{productid:getProductId})
   console.log(list)
   setProductPictureList(list)
   setStatus(false)
    }
  }
  const handlePicture=async()=>{
   var err=false
   if(!checkRequire(getProductPicture.filePic))
   { err=true }
   
   if(!err){
    var formData=new FormData()
    formData.append('pictureid',getPictureId)
    formData.append('productpicture',getProductPicture.filePic)
    var config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('productpicture/updateRecord',formData,config)
    console.log(result)
    if(result){
     setMsg("Product Picture Edited..")
     }
    else{
     setMsg("Fail To Edit Picture..")
    } 
 }
 else{
   setMsg("Please Upload Picture..")
 }

  }
const  SearchProduct=()=>{
   return(
       <div>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
    <Typography variant="h6" gutterBottom>
     Search  Product Pictures
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
           
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSearchProduct()} >
          Search Product
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()} >
          Reset
         </Button>
        </Grid>
        
     </Grid>
     
 </Paper>
 </div>
   )
     }

const DisplayPictures=()=>{
    return(
    <div className={classes.tableDiv} >
    <MaterialTable style={{backgroundColor:'#ecf0f1'}}
      title="Product Pictures List"
      columns={state.columns}
      data={getProductPictureList}
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
                const data = [...getProductPictureList]
           data.splice(data.indexOf(oldData), 1);
                setProductPictureList(data)
                handleDelete(oldData)
              
            }, 600);
          }),
      }}
    />
    </div>

    )
}

const handleDialog=()=>{
    return (
      <div>
        <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Product Picture [Edit] </DialogTitle>
          <DialogContent>
            <DialogContentText>
            
            </DialogContentText>
            <div>
            <Paper className={classes.paperStyle}>
 
     <Grid container spacing={1}>
     
            <Grid item xs={6} style={{marginTop:10}}> 
         <Avatar alt="Remy Sharp" variant='rounded' src={getProductPicture.picture} style={{ width:150,
        height:120,}}/>
         </Grid>
         
           <Grid item xs={6} className={classes.center}>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filepic"
        multiple
        type="file"
        onChange={(event)=>setProductPicture({picture:URL.createObjectURL(event.target.files[0]),filePic:event.target.files[0]})}
      />
      <label htmlFor="contained-button-filepic">
      <Button variant="contained" color="primary"   className={classes.button}  startIcon={<CloudUploadIcon />} component="span">
          Upload Picture
        </Button>
      </label>
        </Grid>
        <Grid item xs={12} className={classes.center}>
        <Button variant="contained" color="primary"   className={classes.button}  component="span" onClick={()=>handlePicture()} >
          Edit Picture
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
 { getStatus ? SearchProduct() : DisplayPictures() }
 {handleDialog()}
 </div>
 );

}


export default ProductPictureInterface;