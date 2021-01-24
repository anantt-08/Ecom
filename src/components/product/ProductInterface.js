import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postDataAndImage, getData, postData}   from  '../FetchNodeServices'
import {checkRequire} from '../Checks'

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
        width: 60,
        height: 60,
      },
    input:
     {
      display: 'none',

    },
    button: {
      margin: theme.spacing(1),
       width:220,
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    }
  }));


function ProductInterface(props){
    const classes=useStyles()
    const [getProductName,setProductName]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getPrice,setPrice]=useState('')
    const [getOfferPrice,setOfferPrice]=useState('')
    const [getOfferType,setOfferType]=useState('')
    const [getDelivery,setDelivery]=useState('')
    const [getRatings,setRatings]=useState('')
    const [getColor,setColor]=useState('')
    const [getVendorStatus,setVendorStatus]=useState('Not-Verify')
    const [getAdStatus,setAdStatus]=useState('')
    const [getCategoryId,setCategoryId]=useState('')
    const [getBrandId,setBrandId]=useState('')
    const [getModelId,setModelId]=useState('')
    const [getPicture,setPicture]=useState({pic:'',filePic:''})
    const [getAd,setAd]=useState({ad:'',fileAd:''})
    const [getVendorId,setVendorId]=useState('')
    const [getStock,setStock]=useState('')
    const [getMsg,setMsg]=useState('')
    const [getCategoryList,setCategoryList]=useState([])
    const [getBrandList,setBrandList]=useState([])
    const [getModelList,setModelList]=useState([])
    const [getErrProductName,setErrProductName]=useState('')
    const [getErrDescription,setErrDescription]=useState('')
    const [getErrPrice,setErrPrice]=useState('')
    const [getErrOfferPrice,setErrOfferPrice]=useState('')
    const [getErrOfferType,setErrOfferType]=useState('No offer')
    const [getErrDelivery,setErrDelivery]=useState('')
    const [getErrRatings,setErrRatings]=useState('')
    const [getErrColor,setErrColor]=useState('')
    const [getErrVendorStatus,setErrVendorStatus]=useState('')
    const [getErrAdStatus,setErrAdStatus]=useState('')
    const [getErrCategoryId,setErrCategoryId]=useState('')
    const [getErrBrandId,setErrBrandId]=useState('')
    const [getErrModelId,setErrModelId]=useState('')
    const [getErrPicture,setErrPicture]=useState('')
    const [getErrAd,setErrAd]=useState('')
    const [getErrVendorId,setErrVendorId]=useState('')
    const [getErrStock,setErrStock]=useState('')

const handleVendorId=()=>{
  var vendor=JSON.parse(localStorage.getItem('vendor'))
  setVendorId(vendor.vendorid)
  
}

const fetchCategory=async()=>{
        var list=await getData('category/displayall')
        setCategoryList(list)
        }
     
        useEffect(function(){
           fetchCategory()
           handleVendorId()
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
  
    const handleSubmit=async()=>{
    var err=false
    if(!checkRequire(getProductName))
    { err=true
      setErrProductName('/images/cross.png') }
    if(checkRequire(getProductName))
    { setErrProductName('/images/tick.png')}
     
    if(!checkRequire(getDescription))
    { err=true
      setErrDescription('/images/cross.png') }
    if(checkRequire(getDescription))
    { setErrDescription('/images/tick.png')}
    

    if(!checkRequire(getPrice))
    { err=true
      setErrPrice('/images/cross.png') }
    if(checkRequire(getPrice))
    { setErrPrice('/images/tick.png')}
    
    if(!checkRequire(getOfferPrice))
    { err=true
      setErrOfferPrice('/images/cross.png') }
    if(checkRequire(getOfferPrice))
    { setErrOfferPrice('/images/tick.png')}
    
    if(!checkRequire(getDelivery))
    { err=true
      setErrDelivery('/images/cross.png') }
    if(checkRequire(getDelivery))
    { setErrDelivery('/images/tick.png')}
   
    if(!checkRequire(getRatings))
    { err=true
      setErrRatings('/images/cross.png') }
    if(checkRequire(getRatings))
    { setErrRatings('/images/tick.png')}

    if(!checkRequire(getColor))
    { err=true
      setErrColor('/images/cross.png') }
    if(checkRequire(getColor))
    { setErrColor('/images/tick.png')}

    if(!checkRequire(getVendorStatus))
    { err=true
      setErrVendorStatus('/images/cross.png') }
    if(checkRequire(getVendorStatus))
    { setErrVendorStatus('/images/tick.png')}

    if(!checkRequire(getStock))
    { err=true
      setErrStock('/images/cross.png') }
    if(checkRequire(getStock))
    { setErrStock('/images/tick.png')}

    if(!checkRequire(getAdStatus))
    { err=true
      setErrAdStatus('/images/cross.png') }
    if(checkRequire(getAdStatus))
    { setErrAdStatus('/images/tick.png')}

    if(!checkRequire(getPicture.filePic))
    { err=true
      setErrPicture('/images/cross.png') }
    if(checkRequire(getPicture.filePic))
    { setErrPicture('/images/tick.png')}

    if(!checkRequire(getAd.fileAd))
    { err=true
      setErrAd('/images/cross.png') }
    if(checkRequire(getAd.fileAd))
    { setErrAd('/images/tick.png')}

    if(!checkRequire(getVendorId))
    { err=true
      setErrVendorId('/images/cross.png') }
    if(checkRequire(getVendorId))
    { setErrVendorId('/images/tick.png')}

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

    if(!checkRequire(getOfferType))
    { err=true
      setErrOfferType('/images/cross.png') }
    if(checkRequire(getOfferType))
    { setErrOfferType('/images/tick.png')}

if(!err){
  var formData=new FormData
  formData.append('productname',getProductName)
  formData.append('description',getDescription)
  formData.append('price',getPrice)
  formData.append('offerprice',getOfferPrice)
  formData.append('delivery',getDelivery)
  formData.append('offertype',getOfferType)
  formData.append('ratings',getRatings)
  formData.append('color',getColor)
  formData.append('vendorstatus',getVendorStatus)
  formData.append('stock',getStock)
  formData.append('categoryid',getCategoryId)
  formData.append('brandid',getBrandId)
  formData.append('modelid',getModelId)
  formData.append('vendorid',getVendorId)
  formData.append('picture',getPicture.pic)
  formData.append('ad',getAd.ad)
  formData.append('adstatus',getAdStatus)
  var config={headers:{'content-type':'multipart/form-data'}}
   var result=await postDataAndImage('product/addnewproduct',formData,config)
   console.log(result)
   if(result){
    setMsg("Record Submitted..")
    }
   else{
    setMsg("Fail To Submit..")
   } 
}
else{
    setMsg("Error in Input...")
}
}

const ClearData=()=>{
    setProductName('')
    setDescription('')
    setPrice('')
    setOfferType('')
    setOfferPrice('')
    setDelivery('')
    setRatings('')
    setColor('')
    setVendorStatus('')
    setAdStatus('')
    setCategoryId('')
    setBrandId('')
    setModelId('')
    setStock('')
    setPicture({pic:'',filePic:''})
    setAd({ad:'',fileAd:''})
    setMsg('')
    setErrProductName('')
    setErrDescription('')
    setErrPrice('')
    setErrOfferType('')
    setErrOfferPrice('')
    setErrDelivery('')
    setErrRatings('')
    setErrColor('')
    setErrVendorStatus('')
    setErrAdStatus('')
    setErrVendorId('')
    setErrCategoryId('')
    setErrBrandId('')
    setErrModelId('')
    setErrStock('')
    setErrPicture('')
    setErrAd()
  }

return(
    <div className={classes.root}>
 <Paper className={classes.paperStyle}>
 <Paper  elevation={1} className={classes.paperHeading} >
 <img src='/images/product.png' alt="Product"  width='60' height='50' />
    <Typography variant="h6" gutterBottom>
        &nbsp;Add Products
      </Typography>
     </Paper>
     <Grid container spacing={1}>
     <Grid item xs={4} className={classes.subclass}>
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
        <Grid item xs={4} className={classes.subclass}>
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
        <Grid item xs={4} className={classes.subclass}>
      <img src={getErrModelId} width='10' height='10' />
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Model Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getModelId}
         onChange={(event)=>setModelId(event.target.value)}
         >  
         {fillModel()}
        </Select>
      </FormControl>
        </Grid>  
        <Grid item xs={12} className={classes.subclass}>
      <img src={getErrProductName} width='10' height='10' />
      <TextField fullWidth label="Product Name" value={getProductName} variant="standard" onChange={(event)=>setProductName(event.target.value)}/>
        </Grid>  
        <Grid item xs={12} className={classes.subclass}>
      <img src={getErrDescription} width='10' height='10' />
      <TextField fullWidth label="Description" value={getDescription} variant="standard"onChange={(event)=>setDescription(event.target.value)} />
        </Grid>  
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrPrice} width='10' height='10' />
      <TextField fullWidth label="Price" variant="standard" value={getPrice} onChange={(event)=>setPrice(event.target.value)}/>
        </Grid>  
      <Grid item xs={6} className={classes.subclass}>
      <img src={getErrOfferPrice} width='10' height='10' />
      <TextField fullWidth label="Offer Price" variant="standard" value={getOfferPrice} onChange={(event)=>setOfferPrice(event.target.value)}/>
        </Grid>
       <Grid item xs={6} className={classes.subclass}>
      <img src={getErrDelivery} width='10' height='10' />
      <TextField fullWidth label="Delivery Charges" variant="standard" value={getDelivery} onChange={(event)=>setDelivery(event.target.value)}/>
        </Grid>  
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrRatings} width='10' height='10' />
      <TextField fullWidth label="Ratings" variant="standard" value={getRatings} onChange={(event)=>setRatings(event.target.value)}/>
        </Grid>  
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrColor} width='10' height='10' />
      <TextField fullWidth label="Color" variant="standard" value={getColor} onChange={(event)=>setColor(event.target.value)}/>
        </Grid>  
        <Grid item xs={6} className={classes.subclass}>
      <img src={getErrOfferType} width='10' height='10' />
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label"> Offer Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={getOfferType}
         onChange={(event)=>setOfferType(event.target.value)}
          > 
         <MenuItem value='No Offer'>No Offer</MenuItem>
        <MenuItem value='Discounted'>Discounted</MenuItem>
        <MenuItem value='Cashback'>Cashback</MenuItem>
        <MenuItem value='Upgraded'>Upgraded</MenuItem>
        </Select>
      </FormControl>
        </Grid>  
        <Grid item xs={6} className={classes.center}>
         <img src={getErrPicture} width='10' height='10' />
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-filepic"
        multiple
        type="file"
        onChange={(event)=>setPicture({pic:event.target.files[0],filePic:URL.createObjectURL(event.target.files[0])})}
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
        onChange={(event)=>setAd({ad:event.target.files[0],fileAd:URL.createObjectURL(event.target.files[0])})}
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
        <img src={getErrAdStatus} width='10' height='10' />
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
        <img src={getErrVendorStatus} width='10' height='10' />
         <div>Vendor Status :
         </div>
       <Radio
        checked={getVendorStatus === 'Verify'}
        onChange={(event)=>setVendorStatus(event.target.value)}
        value="Verify"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Verify
      <Radio
        checked={getVendorStatus === 'Not-Verify'}
       onChange={(event)=>setVendorStatus(event.target.value)}
        value="Not-Verify"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />Not-Verify
        </Grid> 
    <Grid item xs={6} className={classes.subclass}>
      <img src={getErrVendorId} width='10' height='10' />
      <TextField fullWidth label="Vendor Id" variant="standard" value={getVendorId} />
        </Grid> 
     <Grid item xs={6} className={classes.subclass}>
      <img src={getErrStock} width='10' height='10' />
      <TextField fullWidth label="Stock" variant="standard" value={getStock} onChange={(event)=>setStock(event.target.value)}/>
        </Grid> 

        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()}>
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
)
}



export default ProductInterface;