import React, { useState } from "react";

import Input from "./Input"
import Button from "./Button"

const CreateICO = ({
  shortenAddress,
        setOpenCreateIco, 
        connectWallet,
        isAddress,
        Create_ICO_SALE,
}) => {
  const[icoSale,setIcoSale] = useState({
    address:"",
    price:"",
  });
  return (
    <div className="model">
      <div className="model-content">
        <span onClick={()=> setOpenCreateIco(false)} className="close">
          &times;
        </span>
        <h2>Create ICO Sale</h2>
        <div className="input-container" style={{marginTop:"1rem"}}>
          <Input
            placeholder={"Address"}
            onChange={(e)=> setIcoSale({...icoSale,address:e.target.value})}
            
          />  
          <Input
          placeholder={"Price"}
          onChange={(e)=> setIcoSale({...icoSale,price:e.target.value})}
          
        />        
        </div>

        <div className="button-box" style={{
          marginTop:"1rem"
         }}>
           {
            isAddress ?(
              <Button name="Create ICO" handleClick={()=> Create_ICO_SALE(icoSale)}/>
            ):(
              <Button name="Connect Wallet" handleClick={()=> connectWallet()}/>
            )
           }
         </div>
      </div>
    </div>
  )
};

export default CreateICO;
