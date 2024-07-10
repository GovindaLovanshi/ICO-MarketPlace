import React, { useState } from 'react'

const TokenTransfer = ({
    isAddress, 
        transfer_token,
        connectWallet,
        setTransfer,
}) => {

    const[transferTokenDta,setTransferTokenData] = useState({
        address:"",
        tokenAdd:"",
        amount:""
    })
  return (
    <div className="model">
      <div className="model-content">
        <span onClick={()=> setOpenTranferToken(false)} className="close">
          &times;
        </span>
        <h2>Token Transfer</h2>
        <div className="input-container" style={{marginTop:"1rem"}}>
          <Input
            placeholder={"To Address"}
            onChange={(e)=> setTransferTokenData({...transferTokenDta,address:e.target.value})}
            
          />  
          <Input
          placeholder={"Token Address"}
          onChange={(e)=> setTransferTokenData({...transferTokenDta,tokenAdd:e.target.value})}
          
        />  
        <Input
          placeholder={"Amount"}
          onChange={(e)=> setTransferTokenData({...transferTokenDta,tokenAdd:e.target.value})}
          
        />      
        </div>

        <div className="button-box" style={{
          marginTop:"1rem"
         }}>
           {
            isAddress ?(
              <Button name="Token Transfer" handleClick={()=> transferTokenDta(transferTokenDta)}/>
            ):(
              <Button name="Connect Wallet" handleClick={()=> connectWallet()}/>
            )
           }
         </div>
      </div>
    </div>
  )
}

export default TokenTransfer
