import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MainPage from './MainPage';
import {checkMobile,checkRequire} from '../Checks';
import Header from './Header'
import Footer from './Footer'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
   // alignItems: 'center',
    padding:20,
    
    
  },
  formdiv:
  {
    display:'flex',
    backgroundColor:'#f1f2f6',
    flexDirection:'column',
    width:1000,
    backgroundColor:'#FFFFFF',
    borderRadius:'2%'
  },
  
  image: {
    backgroundPosition: 'center',
    backgroundColor:'white',
    
  },
 
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize:32,
    color:'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  blue: {
    backgroundColor:'#0984e3',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
 
}));

 function SignInClient(props) {
  const classes = useStyles();
  const [getMobile,setMobile]=useState('')
  const [getMsg,setMsg]=useState('')
  const [getOTPMsg,setOTPMsg]=useState('')
  const [getOTP,setOTP]=useState('')
  const [getGOTP,setGOTP]=useState('')
  const [getUserStatus,setUserStatus]=useState('')
  const [getUser,setUser]=useState('')
  const SignInForm=()=>{            
    return(
      <div>
      <h1>Hello world</h1>    
      </div>            
    )
    }

    const handleSubmit=async()=>{
      var err=false;
     
    if(getMobile.length==0)
    {err=true
     setMsg(<font color='red' size='2'><i>Please enter your mobile no!</i></font>)
    }
      
    else if(!checkMobile(getMobile))
    { err=true
      setMsg(<font color='red' size='2'><i>Please enter valid mobile no!</i></font>) }
   
      else if(checkMobile(getMobile))
      { setMsg('')    }
  
      if(!err)
    { var body={'mobileno':getMobile}
       var result=await postData('userdetails/checkuserrecord',body)
        setUser(result)
       if(result.RESULT=='NOT FOUND')
      { setUserStatus(false)
      props.history.push({pathname:`/SignInUserForm`},getMobile);}
      else if(result.RESULT=='FOUND')
      {  otpCallback()
         setUserStatus(true)
        //props.history.push({pathname:`/ShowCartWithAddress`},{'data':result.DATA,'mobileno':getMobile});
      }
      else
      {alert("SERVER ERROR")}
    }
   
  }

  const otpCallback=async()=>{
    let otp=parseInt(Math.random()*9999)+1000
    let body={otp:otp,mob:props.location.state}
    let result=await postData('smsapi/sendotp',body)
    if(result.result)
    { alert(result.result)
    setGOTP(otp)
    
    }
  }

 const handleVerify=()=>{
 
  if(!checkRequire(getOTP))
{
  setOTPMsg(<font color='red' size='2'><i>Please enter OTP</i></font>)    
}
else
{
  



  if(getOTP==getGOTP)
  {
  props.history.push({pathname:`/ShowCartWithAddress`},{'data':getUser.DATA,'mobileno':getMobile});
  }
  else{
    setOTPMsg(<font color='red' size='2'><i>Invalid OTP</i></font>)    


  }
}
 }

  return (
     <div>
       <Header history={props.history} />
    <div className={classes.root}>
    <div className={classes.formdiv}>  
    <Grid container component="main" spacing={3} className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6}   style={{backgroundColor:'#FFFFFF',display:'flex',padding:10,alignItems:'center',justifyContent:'center'}} >
        <img src='/images/signinclient.jpg' />
        </Grid>
      <Grid item xs={12} sm={6} style={{backgroundColor:'#FFFFFF',padding:20}} >
       
        
          <h1>Sign In</h1>
          <h4>Sign in to access your Orders, Offers and Wishlist.</h4>
        
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              placeholder="Enter your mobile no"
              name="mobile"
              autoComplete="mobile"
              autoFocus
              size="small"
              value={getMobile} 
              onChange={(event)=>{setMobile(event.target.value)}}
                 />
            {getMsg}
        
            <Grid style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Button
              //type="submit"              
              color="primary"
              //className={classes.submit}
              //display= 'flex'
              //flexDirection= 'column'
              //alignItems= 'center'
              //onClick={<a href="/Mainpage">View React Commits</a>}
              onClick={()=>handleSubmit()}
            >
              
              <Avatar className={classes.blue}  >
              {/*<a href="/SignInUserForm" style={{ textDecoration: 'none' }} >*/}<font color="white" size='6' >&gt;</font>{/*</a>*/}  
            </Avatar>
            
            </Button>
           </Grid>  
         
         {getUserStatus?<>
           <Grid  item xs={12}>
             <h2>Verify</h2> 
            <small>We have sent 6 digit OTP on <font size='2'><b>+{props.location.state}</b></font>
             <font color='red' style={{paddingLeft:'230px'}} >Change</font></small>
          </Grid>  

          <Grid  item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="otp"
              placeholder="Enter your OTP"
              name="otp"
              //autoComplete="email"
              autoFocus
              size="small"      
              onChange={(event)=>{setOTP(event.target.value)}}                             
            />
            {getOTPMsg }
            <small style={{paddingLeft:'350px'}}><font color='red'>Resend OTP</font></small>
            
            </Grid>

            <Grid  item xs={12}>
             <Button variant="contained" fullWidth color="primary"  onClick={()=>handleVerify()}>
              Verify
             </Button>
             {//getMsg
             }
            </Grid>
            </>:<></>}



          
        
      </Grid>
           
    </Grid>

    <div>
</div>
  
  
</div>

</div>
<Grid container>
<Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center',padding:20}} >
  <small>By continuing you agree to our&nbsp;<font color='red'> Terms of service</font>&nbsp;
   <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   and<font color='red' >&nbsp; Privacy & Legal Policy.</font></small>
  </Grid>
  </Grid>
 

<Footer />
</div>
  );
}

export default SignInClient;