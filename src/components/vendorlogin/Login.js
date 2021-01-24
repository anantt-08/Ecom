import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { postData } from '../FetchNodeServices';
import Alert from '@material-ui/lab/Alert';


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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatortheme:{
    width:190,
    height:150,
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [getVendorId,setVendorId]=useState('')
  const [getPassword,setPassword]=useState('')
  const [getAlert,setAlert]=useState(false)

 const handleSubmit=async()=>{
     var body={vendorid:getVendorId,password:getPassword}
      var result=await postData('vendorlogin/vendorchecklogin',body)
      if(result.length==1)
      { //console.log(props)
        localStorage.setItem('vendor',JSON.stringify({vendorid:result[0].outletid,firmname:result[0].firmname,ownername:result[0].ownername,photo:result[0].photograph}))
        props.history.replace({pathname:`/VendorDashboard`}) 
       }
      else
     {setAlert(true)}
      }

 function AlertMsg(){

  return(
    <div>
   {getAlert ? (<div>
      <Alert variant="filled" severity="error">
        Invalid Id / Password
      </Alert>
    </div>) : <div></div>}
    </div>
  )
 }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <img src='/images/vendor-login.png' alt="Login"  className={classes.avatortheme} ></img>
        <Typography component="h1" variant="h5">
     Welcome to Login Page
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Id/Email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>setVendorId(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event)=>setPassword(event.target.value)}

          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           onClick={()=>handleSubmit()}
          >
            Login
          </Button>
      </div>
      <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      {AlertMsg()}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}