import React, { useState } from "react";

import uploadLogo from "../Components/UploadLogo"
import Input from "../Components/Input"
import Button from "../Components/Button"
import UploadLogo from "../Components/UploadLogo";

const TokenCreator = ({
          createERC20,
          shortenAddress,
          setTokenCreator,
          setLoader,
          isAddress,
          connectWallet,
          PINATa_SECRET_KEY,
          PINATA_API_KEY
}) => {

const[imageUrl,setImageUrl] =useState();
const[token,setToken] = useState({
  name:"",
  symbol:"",
  supply:""
});

  return (
    <div id={"anyModel"} className={"model"}>
       <div className="model-content">
         <span onClick={()=> setTokenCreator(false)} className="close">
           $times;
         </span>

         <h2 style={{marginBottom:"1rem"}}>Create Token</h2>

         <UploadLogo imageUrl={imageUrl} setImageUrl={setImageUrl} setLoader={setLoader} PINATA_API_KEY={PINATA_API_KEY} PINATa_SECRET_KEY={PINATa_SECRET_KEY}/>

         <div className="input-container">
           <Input
           placeholder={"Name"}
           handleChange={(e)=> setToken({...token,name:e.target.value})}/>

           <Input
           placeholder={"Symbol"}
           handleChange={(e)=> setToken({...token,symbol:e.target.value})}/>
           <Input
           placeholder={"Supply"}
           handleChange={(e)=> setToken({...token,supply:e.target.value})}/>
         </div>

         <div className="button-box" style={{
          marginTop:"1rem"
         }}>
           {
            isAddress ?(
              <Button name="Create Token" handleClick={()=> createERC20(token,isAddress,imageUrl)}/>
            ):(
              <Button name="Connect Wallet" handleClick={()=> connectWallet()}/>
            )
           }
         </div>
       </div>
    </div>
  )
};

export default TokenCreator;
