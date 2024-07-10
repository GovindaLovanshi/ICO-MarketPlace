import React, { useState } from "react";

const BuyToken = ({
  isAddress, 
        buyToken,
        connectWallet,
        setOpenBuyToken,
        buyIco,
        currency,
}) => {
  const[tokenQuentity,setTokenQuentity] = useState(false);
  return (
    <div className="model">
      <div className="model-content">
        <span onClick={()=> setOpenBuyToken(false)} className="close">
          &times;
        </span>
        <h2>Token Transfer</h2>
        <div className="input-container" style={{marginTop:"1rem"}}>
          <Input
            placeholder={"Quentity"}
            onChange={(e)=> setTokenQuentity(e.target.value)}
            
          />  
          <Input
          placeholder={tokenQuentity ?'${tokenQuentity * Number(buyIco?.price)}  ${currency}': "output"}
        />  
             
        </div>

        <div className="button-box" style={{
          marginTop:"1rem"
         }}>
           {
            isAddress ?(
              <Button name="Token Transfer" handleClick={()=> buyToken(buyIco?.token,tokenQuentity)}/>
            ):(
              <Button name="Connect Wallet" handleClick={()=> connectWallet()}/>
            )
           }
         </div>
      </div>
    </div>
  )
};

export default BuyToken;
