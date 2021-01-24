import React,{useState, useEffect} from 'react';
import {getData,ServerURL}  from '../FetchNodeServices'


export default function DisplayAll(props){
 const [getList,setList]=useState([])
 
 const fetchData=async()=>{
   let list=await getData('category/displayall')
       setList(list)
   
 }
 useEffect(function(){
 
 
fetchData()

 },[])

 const displayData=()=>{
   return(
       
         getList.map((item,key)=>{
       return(
         <tr>
         <td>{key}</td><td>{item.categoryname}</td><td>{item.description} </td><td><img src={`${ServerURL}/images/${item.icon}`} width='35' height='35'/> </td>
         </tr> 
       ) })

    )
    
 }
 
return(
<div>
   <center>
  <table cellSpacing='0' border='1'> 
  <caption><b>LIst of Products</b></caption>
  <tr><th>Index</th><th>Name</th><th>Description</th><th>Icon</th></tr>
  {displayData()}
  </table>
  </center>
</div>

)


}

