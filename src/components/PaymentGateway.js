import React, { Component,useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import { postData } from '../../FetchService';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    margin: {
      marginRight:'80%',
      paddingLeft:''
    },
    button: {
      margin: theme.spacing.unit,
    },
  
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

const PaymentGateway = (props) => {

    const [getName,setName]=useState('Sandeep')
    const [getMobile,setMobile]=useState('9301123085')
    const [getEmail,setEmail]=useState('ss@gmail.com')

    // const handleRazorpay=async(id)=>{
    //     let body={name:getName,
    //     email:getEmail,
    //     mobile:getMobile,
    //     amount: props.invoice_total/100,
    //     razorpayid:id
    //     }
    //     let result=await postData('userpayment/addnew',body)
    //     alert(result)
    // }


    const options = {
        key: 'rzp_test_GQ6XaPC6gMPNwH',
        amount: '100', //  = INR 1
        name: 'Numeric Infosystem.',
        // description: 'some description',
        image: 'https://i.pinimg.com/originals/d1/d2/66/d1d26618a7876afa7b99f2afebf6c790.jpg',
        handler: function(response) {
            // handleRazorpay(response.razorpay_payment_id)
            // props.addnewrecord()
            alert(response.razorpay_payment_id);
            
        },
        prefill: {
            name: getName,
            contact: getMobile,
            email: getEmail
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: 'blue',
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
       
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        setTimeout(()=>{
            openPayModal()
        },3000)
    }, []);


 
    const { classes } = props;

    return (
        <>
        <center>
            <Typography>Transferring to Razorpay...</Typography>
                </center>
        </>
    );
};

export default withStyles(styles)(PaymentGateway);