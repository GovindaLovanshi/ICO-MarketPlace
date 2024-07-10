import React, { useState } from "react";

import Input from "./Input" 
import Button from "./Button";

const WidthdrawToken = ({
  isAddress,
        withdraw_token,
        connectWallet,
        setOpenWithdrawToken,
}) => {
  const[withdrawQuentity,setWithdrawQuentity] = useState({
    address:"",
    tokenAdd:"",
    amount:"",
  })
  return (
    <div className="model">
      <div className="model-content">
        <span onClick={()=> setOpenWithdrawToken(false)} className="close">
          &times;
        </span>
        <h2>Wuithdraw Token</h2>
        <div className="input-container" style={{marginTop:"1rem"}}>
          <Input
            placeholder={"Token Address"}
            onChange={(e)=> setWithdrawQuentity({...withdrawQuentity,token:e.target.value})}
            
          />  
          <Input
          placeholder={"Quentity"}
          onChange={(e)=> setWithdrawQuentity({...withdrawQuentity,amount:e.target.value})}
          
        />  
           
        </div>

        <div className="button-box" style={{
          marginTop:"1rem"
         }}>
           {
            isAddress ?(
              <Button name="Token Transfer" handleClick={()=> withdraw_token(withdrawQuentity)}/>
            ):(
              <Button name="Connect Wallet" handleClick={()=> connectWallet()}/>
            )
           }
         </div>
      </div>
    </div>
  )
};

export default WidthdrawToken;
