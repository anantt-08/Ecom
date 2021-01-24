const initialState={
    cart:{}
   
}


function RootReducer(state=initialState,action){
  switch (action.type)
  { case 'ADD_CART':
    state.cart[action.payload[0]]=action.payload[1]
    console.log("CART",state.cart)
    return {cart:state.cart}
    case 'REMOVE_ITEM':
    delete state.cart[action.payload[0]]
    return {cart:state.cart}
    
    default:
        return state    
         

  }

}
export default RootReducer