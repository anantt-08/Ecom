import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {getData}  from '../FetchNodeServices'

var settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1
};
const useStyles = makeStyles((theme) => ({
  
     footerpaper: {
      height:'520px',
      background:'#d2dae2',
          
    },
}));



export default function Footer() {
    const classes = useStyles();
    const [getList,setList]=useState([])
    const fetchData=async()=>{
        let list=await getData('category/fetchcategory')
            setList(list)   
      }
    
    useEffect(function(){
    fetchData()

    },[])
    const displayAllCategoriesInFooter=()=>{
        return(        
              getList.map((item,key)=>{
            return(
              
               <div className={classes.mainmenuitems}><font size='2'>{item.categoryname}</font></div>
              
            ) })
         )   
      }
     
     
      const footer=()=>{
            
        return(
          <div>
          
        <Paper className={classes.footerpaper} >
         <Grid container spacing={0}>

            <Grid item xs={3} style={{paddingTop:'32px',paddingLeft:'190px'}}>
            <h5>MOST POPULAR CATEGORIES</h5>
            {displayAllCategoriesInFooter()}            
            </Grid>

            <Grid item xs={3} style={{paddingTop:'32px',paddingLeft:'230px'}}>
            <h5>CUSTOMER SERVICES</h5>    
            <font size='2'>
            About Us<br/>
            FAQ<br/>
            Terms And Conditions<br/>
            Privacy Policy<br/>
            E-Waste Policy    
            </font>                 
            </Grid>
            
            <Grid item xs={3} style={{paddingTop:'55px',paddingLeft:'270px'}}>
            <Divider orientation="vertical" />
            </Grid>

            <Grid item xs={3} style={{paddingTop:'32px',paddingLeft:'1px'}}>
            <h5>CONTACT US</h5>  
            <font size='2'>
            WhatsApp us :</font><font size='2' color='blue'><b> 900 0293 798</b></font><br/>
            <font size='2'>Call Us :</font><font size='2' color='blue'><b> 1800 890 1222</b></font><br/><br/>
            <font size='2'>8:00 AM to 8:00 PM, 365 days<br/><br/>
            Please note that you are accessing the BETA <br/>Version of</font>
            <font size='2' color='blue'>www.jiomart.com</font><br/><br/>
            <font size='2'>Should you encounter any bugs,glitches lack<br/> of functionality
           delayed deliveries, billing errors<br/> or other problems on the beta
           website, please<br/> email us on</font><font size='2' color='blue'> cs@jiomart.com</font><br/>
           
           <h5>DOWNLOAD APP</h5> 
           < img src='/images/playstore.png'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           < img src='/images/appstore.png'/>
            </Grid>

           <Grid item xs={12}><br/>
            <Divider /> 
           </Grid>

           <Grid item xs={12}>
           <font size='2'>  
           <p style={{paddingLeft:'250px'}}>Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Â© 2020 All rights reserved. Reliance Retail Ltd.</p> 
           </font>
           </Grid>


          </Grid>
            </Paper>

           </div>            
        )
        }
    

        return(
         <div>
             {footer()}
         </div>

        )



}
