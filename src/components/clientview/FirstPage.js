import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getData,ServerURL,postData} from '../FetchNodeServices';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useDispatch,useSelector} from 'react-redux'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {QtyCtrl} from './QtyCtrl'
import Header from './Header'
import Footer from './Footer'



import "react-responsive-carousel/lib/styles/carousel.min.css";
var Carousel = require('react-responsive-carousel').Carousel;
var settings = {
  
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
};
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlemenu: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mainmenu:{
    display: 'flex',
    flexDirection:'row'
    
  },
  mainmenuitems:{
      marginRight:20,
  },
  cardroot: {
    alignItems:'center',
    justifyContent:'center',
    display:'flex',
    padding:20,
    width:190,
    height:220,
    margin:10,
   
    borderRadius:12,
         },

        topbrandmedia: {
          display:'flex',
          width:'100%',
          height:'100%',
          
          
          
          
        },
         topbrandroot: {
          alignItems:'center',
          justifyContent:'center',
          display:'flex',
          padding:10,
          width:180,
          height:'auto',
          margin:10,
          
         
          borderRadius:12,
               },

         toproot: {
          alignItems:'center',
          justifyContent:'center',
          display:'flex',
          padding:20,
          width:'auto',
          height:'auto',
          margin:10,
          border:'1px solid #dcdde1',
          borderRadius:12,
               },
  action:{
    alignItems:'center',
  justifyContent:'center',
  display:'flex',
  padding:15
}  ,

text:{
display:'flex',
paddingTop:10, 

},
  media: {
    display:'flex',
    width:200,
    height: 200,
    
    
  },
  topmedia: {
    display:'flex',
    width:150,
    height:150,
    
    
  },
  cardview:{

    display: 'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center'
    
  },
  
  
  scardview:{

    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
    
  }, 
 
  cartbtn:{
    padding:5,
    width:150,
  }, 
  gridList: {
    width: '90%',
   
   
    
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  lroot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
   // backgroundColor: theme.palette.background.paper,
  },
}));

export default function FirstPage (props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [getSClist,setSCList]=React.useState([])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  var dispatch=useDispatch()
  var cartitems=useSelector(state=>state.cart)
  
  const [getCount,setCount]=React.useState(cartitems.length)
  
  




/////////////////Main Menu Implimentaation///////////
  const [getList,setList]=useState([])
  const [getListBrand,setListBrand]=useState([])
  const [anchorMM, setAnchorMM] = React.useState(null);
  const [getListAd,setListAd]=useState([])
  const [getListTop,setListTop]=useState([])
  const [getListBAd,setListBAd]=useState([])

  const [getListTopBrands,setListTopBrands]=useState([])
  const [getListNewBrands,setListNewBrands]=useState([])
  const [getListbycategory,setListbycategory]=useState([])

  
 
  

  
  const handleClose = () => {
    setAnchorMM(null);
  };
  
  const handleClick=(event)=>{
     //alert(event.currentTarget.value)
     fetchDataBrand(event.currentTarget.value)
     setAnchorMM(event.currentTarget);

    }
  
  
  const fetchDataBrand=async(categoryid)=>{
     let body={'categoryid':categoryid}
    let list=await postData('brand/displaybybrandidMainMenu',body)
        setListBrand(list)
    
  }

  const fetchBrandAd=async()=>{
      let list=await getData('brand/displayallbrandad')
       setListBAd(list)
   
 }

 const fetchTopBrand=async()=>{
  let list=await getData('brand/displayalltopbrand')
   setListTopBrands(list)

}

const fetchNewBrand=async()=>{
  let list=await getData('brand/displayallNewBrand')
   setListNewBrands(list)

}
  
  
  const fetchDataTopProducts=async()=>{
    let list=await getData('product/displayalltopproducts')
  
        setListTop(list)
    
  }
  const fetchDataAd=async()=>{
    let list=await getData('category/fetchcategorybyadstatus')
  
        setListAd(list)
    
  }
  
  const fetchData=async()=>{
    let list=await getData('category/fetchcategory')
        setList(list)
    
  }
  const fetchbycategory=async()=>{
    let list=await getData('category/fetchcategory')
        setListbycategory(list)
    
  }
  useEffect(function(){
  
  
 fetchData()
 fetchDataAd()
 fetchBrandAd()
 fetchDataTopProducts()
 fetchTopBrand()
 fetchNewBrand()
 fetchbycategory()
 
  },[])
 
  const displayBrandMenu=()=>{
    return(
        
          getListBrand.map((item,key)=>{
        return(
          
        <MenuItem onClick={handleClose}>{item.brandname}</MenuItem>
       
           
        ) })
 
     )
     
  }
  


  const displayMainMenu=()=>{
    return(
        
          getList.map((item,key)=>{
        return(
          
             <div   className={classes.mainmenuitems}><Button aria-controls="simple-menu" aria-haspopup="true"  value={item.categoryid} onClick={(event)=>handleClick(event)}>{item.categoryname}</Button></div>
           
           
        ) })
 
     )
     
  }
  
///////////////////////////////////////////////
  const showCategory=()=>{
    return(
        
      getListAd.map((item,key)=>{

return(
<div>
<Card className={classes.cardroot}>
  
  <CardActionArea className={classes.action}>
    <CardMedia
      className={classes.media}
      image={`${ServerURL}/images/${item.ad}`}
      title={item.categoryname}
    />
      </CardActionArea>
  <div className={classes.text}>
    {item.categoryname}
    </div>
  
  
  </Card>
  </div>

)
}))
  }
const handleShowProduct=(categoryid)=>{
  props.history.push({pathname:`/ViewListofProducts/${categoryid}`})

}
const handleShowProductView=(productid)=>{
  props.history.push({pathname:`/ProductView/${productid}`})

}


  const showCategoryDiv=()=>{
   var colors=['#ffeaa7','#81ecec','#74b9ff','#e056fd']
    return(
        
      getListAd.map((item,key)=>{

return(
<div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} onClick={()=>handleShowProduct(item.categoryid)}>
<div className={classes.cardroot} style={{ backgroundColor:`${colors[Math.floor((Math.random()*3))]}`}}>
  
<Avatar  variant="rounded" className={classes.media}
     alt={item.categoryname} src={`${ServerURL}/images/${item.icon}`} />
    
      
      
  
  
  
  
  </div>
  <div className={classes.text}>
    {item.categoryname}
    </div>
  </div>

)
}))
  }
const slider=()=>{
  //onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
  return(
        
    getListAd.map((item,key)=>{
  
  return (
    <div>
        <img src={`${ServerURL}/images/${item.ad}`} />
         
    </div>
         )})
    
  )}
    
  const showTopProductsDiv=()=>{
    
     return(
         
       getListTop.map((item,key)=>{
      var save=item.price-item.offerprice
 return(
 <div >
 <div className={classes.toproot}>
   <div style={{display:'flex',flexDirection:'column'}}>
 <Avatar  variant="rounded" className={classes.topmedia}
   onClick={()=>handleShowProductView(item.productid)}   alt={item.productname} src={`${ServerURL}/images/${item.picture}`} />
    
       
       
     <div className={classes.text}>
     <b>{item.productname.length>=40?(item.productname).toString().substring(0,20)+"...":item.productname}</b>
     </div>
     <div>
       M.R.P <s><span>&#8377;</span> {item.price}</s>
     </div>
     <div>

     <b><span>&#8377;</span> {item.offerprice}</b>
     </div>  
     <div>
     <small><font color='green'>Save <span>&#8377;</span> {save}</font></small>
       
     </div>
     <div>
   { item.cartstatus==0?(<Button className={classes.cartbtn} variant="contained" onClick={()=>addToCart(item,key)} color="primary">
      Add to Cart
      </Button>):(<QtyCtrl value={1} onChange={(value)=>handleQtyChange(value,item,key)} />)}
     
     </div>

</div>
   
   
   
   </div>
  </div>
 
 )
 }))
   }

   function BrandAdGridList() {
    
    return (
      <div className={classes.lroot}>
        <GridList cellHeight={400} className={classes.gridList}>
          {getListBAd.map((tile) => (
            <GridListTile key={tile.ad}>
              <img src={`${ServerURL}/images/${tile.ad}`} style={{width:'100%',height:'100%'}} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }


  const showTopBrands=()=>{
    //var colors=['#ffeaa7','#81ecec','#74b9ff','#e056fd']
     return(
         
       getListTopBrands.map((item,key)=>{
 
 return(
 <div>
 <div className={classes.topbrandroot} style={{ backgroundColor:'#f1f2f6'}}>
   
 
        
        <img src={`${ServerURL}/images/${item.ad}`} className={classes.topbrandmedia}/>
   
   
   
   </div>
     
   </div>
 
 )
 }))
   }

   const showNewBrands=()=>{
    //var colors=['#ffeaa7','#81ecec','#74b9ff','#e056fd']
     return(
         
       getListNewBrands.map((item,key)=>{
 
 return(
 <div>
 <div className={classes.topbrandroot} style={{ backgroundColor:'#f1f2f6'}}>
   
 
        
        <img src={`${ServerURL}/images/${item.ad}`} className={classes.topbrandmedia}/>
   
   
   
   </div>
     
   </div>
 
 )
 }))
   }

 //shop by category
 const shopbycategory=()=>{
    
  return(
      
    getListbycategory.map((item,key)=>{
   
return(
<div>
<div className={classes.toproot}>
<div style={{display:'flex',flexDirection:'column'}}>
<Avatar  variant="rounded" className={classes.topmedia}
   alt={item.categoryname} src={`${ServerURL}/images/${item.icon}`} />
 
    
    
  <div className={classes.text}>
  <b>{item.categoryname}</b>
  </div>
  

</div>



</div>
</div>

)
}))
}
const handleQtyChange=(value,item,key)=>
{ if(value==0)
  { 
    item['qtydemand']=value
    var list=getListTop
    list[key]['cartstatus']=0
    setListTop(list)
    dispatch({type:"REMOVE_ITEM",payload:[item.productid,item]})
    setCount(value)//only rendring

  }
  else
  {
  item['qtydemand']=value
  dispatch({type:"ADD_CART",payload:[item.productid,item]})
  setCount(value)//only rendring

}
}


const addToCart=(item,key)=>{
  item['qtydemand']=1
  var list=getListTop
  list[key]['cartstatus']=1
  setListTop(list)
  dispatch({type:"ADD_CART",payload:[item.productid,item]})
  setCount(item.productid)//only rendring
  

}


  return (
    <div className={classes.grow}>
      <Header history={props.history} />
      
      <Carousel showArrows={true} autoPlay={true} showThumbs={false}>
    
            {slider()}
            </Carousel>
            
          <Typography style={{marginLeft:60,paddingTop:30}}>
          <h3>Shop from Top Categories</h3>
          </Typography>
      <div className={classes.cardview} >
      {showCategoryDiv()}   
        
      </div>
     
      <Typography style={{marginLeft:60,paddingTop:30}}>
          <h3>Top Offers</h3>
          </Typography>
      <div className={classes.scardview} >
      <div style={{width:'90%'}}>  
      <Slider {...settings}> 
     
      {showTopProductsDiv()}
          
     </Slider>
     </div>
      </div>

     <div>
       {BrandAdGridList()}
     </div>

     <Typography style={{marginLeft:60,paddingTop:30}}>
          <h3>Shop by Category</h3>
          </Typography>
      <div className={classes.scardview} >
      <div style={{width:'90%'}}>  
      <Slider {...settings}> 
     
      {shopbycategory()}
     </Slider>
     </div>
      </div>
     


     <Typography style={{marginLeft:60,paddingTop:30}}>
          <h3>Top Brands</h3>
          </Typography>
     <div className={classes.scardview} >
      <div style={{width:'90%'}}>  
      <Slider {...settings}> 
     
      {showTopBrands()}
          
     </Slider>
     </div>
     </div>

     <Typography style={{marginLeft:60,paddingTop:30}}>
          <h3>New Brands</h3>
          </Typography>
     <div className={classes.scardview} >
      <div style={{width:'90%'}}>  
      <Slider {...settings}> 
     
      {showNewBrands()}
          
     </Slider>
     </div>
     </div>

      <Footer />
    </div>
  );
}