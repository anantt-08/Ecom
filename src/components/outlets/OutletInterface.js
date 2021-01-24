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
import {postDataAndImage,getData, postData}   from  '../FetchNodeServices'
import { checkRequire } from '../Checks';
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
        width: theme.spacing(9),
        height: theme.spacing(9),
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
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth:200,
    },
  }));

function OutletInterface(){
    const classes=useStyles();
    const [getFirm,setFirm]=useState('')
    const [getOwner,setOwner]=useState('')
    const [getMobile,setMobile]=useState('')
    const [getPhone,setPhone]=useState('')
    const [getRegno,setRegno]=useState('')
    const [getGst,setGst]=useState('')
    const [getAddress,setAddress]=useState('')
    const [getState,setState]=useState('')
    const [getCity,setCity]=useState('')
    const [getLocation,setLocation]=useState('')
    const [getPhoto,setPhoto]=useState({photo:'',file:''})
    const [getEmail,setEmail]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getAvgprice,setAvgprice]=useState('')
    const [getRatings,setRatings]=useState('')
    const [getStatus,setStatus]=useState('')
    const [getPassword,setPassword]=useState('')
    const [getLat,setLat]=useState('')
    const [getLong,setLong]=useState('')
    const [getMsg,setMsg]=useState('')
    const [getErrFirm,setErrFirm]=useState('')
    const [getErrOwn,setErrOwn]=useState('')
    const [getErrEmail,setErrEmail]=useState('')
    const [getErrLoc,setErrLoc]=useState('')
    const [getErrLat,setErrLat]=useState('')
    const [getErrLong,setErrLong]=useState('')
    const [getErrMob,setErrMob]=useState('')
    const [getErrPhone,setErrPhone]=useState('')
    const [getErrDes,setErrDes]=useState('')
    const [getErrAddress,setErrAddress]=useState('')
    const [getErrState,setErrState]=useState('')
    const [getErrCity,setErrCity]=useState('')
    const [getErrStatus,setErrStatus]=useState('')
    const [getErrReg,setErrReg]=useState('')
    const [getErrGst,setErrGst]=useState('')
    const [getErrRate,setErrRate]=useState('')
    const [getErrPhoto,setErrPhoto]=useState('')
    const [getErrPass,setErrPass]=useState('')
    const [getErrAvg,setErrAvg]=useState('')
    const [getListState,setListState]=useState([])
    const [getListCity,setListCity]=useState([])
    useEffect(function(){
     fetchStates()

    },[])

    const fetchStates=async()=>{
      let list=await getData('statecity/displayall')
      setListState(list)

    }
    const fetchCity=async(stateid)=>{
      var body={'stateid':stateid}
      var list=await postData('statecity/displayallcities',body)
      setListCity(list) 
    }
    const fillStateItem=()=>{
      return(
         
        getListState.map((item,key)=>{
      return(
      <MenuItem value={item.stateid}>{item.statename}</MenuItem>
  
      )})
      )
  
    }

    const fillCityItem=()=>{
      return(
         
        getListCity.map((item,key)=>{
      return(
      <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
  
      )})
      )
  
    }




    const handleStateChange=(event)=>{
 
      setState(event.target.value)
      fetchCity(event.target.value)  
    
      }
      const handleCityChange=(event)=>{
 
        setCity(event.target.value)
        
        }
    const handleSubmit=async()=>{
       var err=false
       if(!checkRequire(getFirm))
       {  err=true
          setErrFirm('/images/cross.png')}
       if(checkRequire(getFirm)){
         setErrFirm('/images/tick.png')
       }

       if(!checkRequire(getOwner))
       {  err=true
         setErrOwn('/images/cross.png')}
       if(checkRequire(getOwner)){
         setErrOwn('/images/tick.png')
       }

       if(!checkRequire(getMobile))
       {err=true
        setErrMob('/images/cross.png')}
       if(checkRequire(getMobile)){
         setErrMob('/images/tick.png')
       }
       
       if(!checkRequire(getPhone))
       {err=true
        setErrPhone('/images/cross.png')}
       if(checkRequire(getPhone)){
         setErrPhone('/images/tick.png')
       }

       if(!checkRequire(getRegno))
       {err=true
        setErrReg('/images/cross.png')}
       if(checkRequire(getRegno)){
         setErrReg('/images/tick.png')
       }
       
       if(!checkRequire(getGst))
       { err=true
        setErrGst('/images/cross.png')}
       if(checkRequire(getFirm)){
         setErrGst('/images/tick.png')
       }
       
       if(!checkRequire(getAddress))
       {err=true
        setErrAddress('/images/cross.png')}
       if(checkRequire(getAddress)){
         setErrAddress('/images/tick.png')
       }
       
       if(!checkRequire(getState))
       { err=true
        setErrState('/images/cross.png')}
       if(checkRequire(getState)){
         setErrState('/images/tick.png')
       }
       
       if(!checkRequire(getStatus))
       {err=true
        setErrStatus('/images/cross.png')}
       if(checkRequire(getStatus)){
         setErrState('/images/tick.png')
       }
       
       if(!checkRequire(getCity))
       {err=true
         setErrCity('/images/cross.png')}
       if(checkRequire(getCity)){
         setErrCity('/images/tick.png')
       }
       
       if(!checkRequire(getLocation))
       {err=true
        setErrLoc('/images/cross.png')}
       if(checkRequire(getLocation)){
         setErrLoc('/images/tick.png')
       }
       
       if(!checkRequire(getLat))
       {err=true
        setErrLat('/images/cross.png')}
       if(checkRequire(getLat)){
         setErrLat('/images/tick.png')
       }
       
       if(!checkRequire(getLong))
       {err=true
        setErrLong('/images/cross.png')}
       if(checkRequire(getLong)){
         setErrLong('/images/tick.png')
       }

       if(!checkRequire(getEmail))
       {err=true
        setErrEmail('/images/cross.png')}
       if(checkRequire(getFirm)){
         setErrEmail('/images/tick.png')
       }
       
       if(!checkRequire(getPhoto.photo))
       {err=true
         setErrPhoto('/images/cross.png')}
       if(checkRequire(getPhoto.photo)){
         setErrPhoto('/images/tick.png')
       }
       
       if(!checkRequire(getDescription))
       {err=true
        setErrDes('/images/cross.png')}
       if(checkRequire(getDescription)){
         setErrDes('/images/tick.png')
       }
       
       if(!checkRequire(getAvgprice))
       {err=true
        setErrAvg('/images/cross.png')}
       if(checkRequire(getDescription)){
         setErrAvg('/images/tick.png')
       }
       
       if(!checkRequire(getRatings))
       {err=true
        setErrRate('/images/cross.png')}
       if(checkRequire(getRatings)){
         setErrRate('/images/tick.png')
       }
       
       if(!checkRequire(getPassword))
       {err=true
        setErrPass('/images/cross.png')}
       if(checkRequire(getPassword)){
         setErrPass('/images/tick.png')
       }
       
       
       if(!err)
       { var formData=new FormData() 
        formData.append('firmname',getFirm)
        formData.append('ownername',getOwner)
        formData.append('mobile',getMobile)
        formData.append('phone',getPhone)
        formData.append('regno',getRegno)
        formData.append('address',getAddress)
        formData.append('state',getState)
        formData.append('city',getCity)
        formData.append('gst',getGst)
        formData.append('location',getLocation)
        formData.append('photo',getPhoto.photo)
        formData.append('email',getEmail)
        formData.append('description',getDescription)
        formData.append('averageprice',getAvgprice)
        formData.append('ratings',getRatings)
        formData.append('status',getStatus)
        formData.append('password',getPassword)
        formData.append('lat',getLat)
        formData.append('long',getLong)
        var config={headers:{'content-type':'multipart/form-data'}}
        var result=await postDataAndImage('outlet/addnewoutlet',formData,config)
         console.log(result)
        if(result){
           setMsg("Record Submitted..")
                }
        else{
           setMsg("Fail To Submit..")
             }
            }
      else{
            setMsg('Error in Input')
          }
         }
   
      const ClearData=()=>{
          setFirm('')
          setOwner('')
          setMobile('')
          setPhone('')
          setRegno('')
          setGst('')
          setAddress('')
          setState('')
          setCity('')
          setLocation('')
          setLat('')
          setLong('')
          setPhoto({photo:'',file:''})
          setEmail('')
          setDescription('')
          setRatings('')
          setStatus('')
          setPassword('')
          setAvgprice('')
          setErrFirm('')
          setErrOwn('')
          setErrMob('')
          setErrPhone('')
          setErrRate('')
          setErrPhoto('')
          setErrGst('')
          setErrLoc('')
          setErrLat('')
          setErrLong('')
          setErrPass('')
          setErrStatus('')
          setErrState('')
          setErrCity('')
          setErrEmail('')
          setErrRate('')
          setErrDes('')
          setErrAddress('')
          setErrReg('')
          setErrAvg('')
          setMsg('')

      }

    return(
    <div className={classes.root}>
        <Paper className={classes.paperStyle}>
     <Paper  elevation={1} className={classes.paperHeading} >
     <img src='/images/vendor.png' alt="Vendor"  width='70' height='50' />
    <Typography variant="h6" gutterBottom>
    &nbsp;Add Vendor Outlets
      </Typography>
     </Paper>
        <Grid container spacing={1}>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrFirm} width='10' height='10' />
         <TextField fullWidth label='Firm Name' value={getFirm} variant='standard' onChange={(event)=>setFirm(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrOwn} width='10' height='10' />
         <TextField fullWidth label='Owner Name' value={getOwner} variant='standard'onChange={(event)=>setOwner(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrMob} width='10' height='10' />
         <TextField fullWidth label='Mobile No' value={getMobile} variant='standard' onChange={(event)=>setMobile(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrPhone} width='10' height='10' />
         <TextField fullWidth label='Phone-no' value={getPhone} variant='standard'  onChange={(event)=>setPhone(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrEmail} width='10' height='10' />
         <TextField fullWidth label='Email-Id' value={getEmail} variant='standard'  onChange={(event)=>setEmail(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrPass} width='10' height='10' />
         <TextField fullWidth label='Password' value={getPassword} variant='standard'  onChange={(event)=>setPassword(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrReg} width='10' height='10' />
         <TextField fullWidth label='Registration No' value={getRegno} variant='standard' onChange={(event)=>setRegno(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrGst} width='10' height='10' />
         <TextField fullWidth label='GST No' value={getGst} variant='standard' onChange={(event)=>setGst(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrState} width='10' height='10' />
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getState}
          onChange={(event)=>handleStateChange(event)}
        >
         {fillStateItem()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrCity} width='10' height='10' />
         <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getCity}
          onChange={(event)=>handleCityChange(event)}
        >
         {fillCityItem()}
        </Select>
      </FormControl>
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrAddress} width='10' height='10' />
         <TextField fullWidth label='Address'value={getAddress}  variant='standard' onChange={(event)=>setAddress(event.target.value)} /> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrLoc} width='10' height='10' />
         <TextField fullWidth label='Location' value={getLocation} variant='standard' onChange={(event)=>setLocation(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrLat} width='10' height='10' />
         <TextField fullWidth label='Latitude' value={getLat} variant='standard'  onChange={(event)=>setLat(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrLong} width='10' height='10' />
         <TextField fullWidth label='Longitude' value={getLong} variant='standard' onChange={(event)=>setLong(event.target.value)}/> 
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrDes} width='10' height='10' />
         <TextField fullWidth label='Description' value={getDescription} variant='standard' onChange={(event)=>setDescription(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrAvg} width='10' height='10' />
         <TextField fullWidth label='Average Price' value={getAvgprice} variant='standard' onChange={(event)=>setAvgprice(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.subclass}>
         <img src={getErrRate} width='10' height='10' />
         <TextField fullWidth label='Ratings' value={getRatings} variant='standard' onChange={(event)=>setRatings(event.target.value)}/> 
         </Grid>
         <Grid item xs={6} className={classes.center} >
         <img src={getErrPhoto} width='10' height='10' />
         <Avatar alt="Remy Sharp" variant='circle' src={getPhoto.file} className={classes.avatortheme}/>
        </Grid>
        <Grid item xs={6} className={classes.center}>
         <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setPhoto({photo:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})}
       />
       <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary"   className={classes.button} startIcon={<CloudUploadIcon />} component="span">
          Upload Photo
        </Button>
        </label>
         </Grid>
         <Grid item xs={12} className={classes.subclass}>
         <img src={getErrStatus} width='10' height='10' />
         <div> Status :</div>
       <Radio
        checked={getStatus === 'Active'}
        onChange={(event)=>setStatus(event.target.value)}
        value="Active"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'A' }}
      />Active
      <Radio
        checked={getStatus === 'Deactive'}
        onChange={(event)=>setStatus(event.target.value)}
        value="Deactive"
        name="radio-button-demo"
        //inputProps={{ 'aria-label': 'B' }}
      />Deactivate
        </Grid>
        <Grid item xs={6} className={classes.center}>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleSubmit()} > 
          Submit Record
         </Button>
        </Grid>
        <Grid item xs={6}className={classes.center} >
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>ClearData()}>
          Reset
         </Button>
        </Grid>
        <Grid item xs={12} className={classes.subclass}>
          <div><b>Message : {getMsg}</b>
          </div>
        </Grid>
        </Grid>
        </Paper>
   </div>

    )
}


export default OutletInterface;