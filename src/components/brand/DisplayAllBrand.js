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
    width:window.innerWidth*0.71,
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
}
})
)

export default function DisplayAllBrand() {
  const classes=useStyles()
  const [getList,setList]=useState([])
  const [getOpen,setOpen]=useState(false)
  const [getRowData,setRowData]=useState([])
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
  const [getCategoryList,setCategoryList]=useState([])

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'brandid' },
      { title: 'Category Id', field: 'categoryid' },
      { title: 'Name', field: 'brandname' },
      { title: 'Description', field: 'description' },
      { title: 'Picture',   field: 'picture',
      render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.picture}`} className={classes.avatortheme}/></div> },
      { title: 'Ad',   field: 'ad',
      render: rowData=><div><Avatar alt="Remy Sharp" variant='rounded' src={`${ServerURL}/images/${rowData.ad}`} className={classes.avatortheme}/></div> },
      { title: 'Ad Status',   field: 'adstatus'},
      { title: 'Top Brand',   field: 'topbrands'},
      { title: 'New Brand',   field: 'newbrands'},
    ],  
  });
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
      setCategoryId(event.target.value)
    }

  const fetchData=async()=>{
    var list =await getData('brand/displayall')
    setList(list)
}

 useEffect(function(){
    fetchData()
},[])

const handleDelete=async(oldData)=>{
  var body={brandid:oldData.brandid}
  var result=await postData('brand/deleteRecord',body)
}

const handleClickOpen = (rowData) => {
 setOpen(true);
 setRowData(rowData)
 setCategoryId(rowData.categoryid)
 setDescription(rowData.description)
 setBrand(rowData.brandname)
 setAdStatus(rowData.adstatus)
 setTopBrand(rowData.topbrands)
 setNewBrand(rowData.newbrands)
 setPicture({pic:'',filePic:`${ServerURL}/images/${rowData.picture}`})
 setAd({ad:'',fileAd:`${ServerURL}/images/${rowData.ad}`})
 fetchCategory()
};

const handleClose = () => {
 setOpen(false);
 setMsg('')
        setErrCat('')
        setErrDes('')
        setErrNb('')
        setErrBr('')
        setErrTb('')
        setErrPic('')
        setErrAd('')
        setErrAdstatus('')
 fetchData()
};

const handleAd=(event)=>{
  setAd({ad:event.target.files[0],fileAd:URL.createObjectURL(event.target.files[0])})
 }
 
 const handlePicture=(event)=>{
   setPicture({pic:event.target.files[0],filePic:URL.createObjectURL(event.target.files[0])})
  }

const handleEdit=async()=>{
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
    formData.append('brandid',getRowData.brandid)
    var config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('brand/updateRecord',formData,config)
 if(result){
  setMsg("Record Edited..")
  }
 else{
  setMsg("Fail To Edit Record...")
 } 
}
 else{
  setMsg('Error in Input')
 }
}

const handleDialog=()=>{
  return (
    <div>
      <Dialog open={getOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Brand [Edit Record]</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <div className={classes.main} >
          <Paper className={classes.paperStyle}>
      <Grid container spacing={1}>
      <Grid item xs={12} className={classes.subclass} > 
             <img src='/images/tick.png' width='10' height='10' />
             <TextField fullWidth label='Brand Id' value={getRowData.brandid} variant='standard'  />
         </Grid>
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
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleEdit()}>
          Save Record
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


  return (
      <div className={classes.root}>
     <div className={classes.tableDiv} >
    <MaterialTable style={{backgroundColor:'#ecf0f1'}}
      title="Brand List"
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
    {handleDialog()}
    </div>
    </div>
  );
}