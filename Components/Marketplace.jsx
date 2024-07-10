import React from "react";
import toast from "react-hot-toast"
import Button from "./Button";

const Marketplace = ({
           array,
          shortenAddress,
           setBuyIco,
          setBuyToken,
          currency
        
}) => {

  
  const notifySuccess = (msg) => toast.success(msg,{duration:200});
  const notifyError = (msg) => toast.error(msg,{duration:200});

  const copyAddress = (text)=>{
    navigator.clipboard.writeText(text);
    notifySuccess("copied Successfully");
  }
  return(
    <div className="table-container">
         <table className="custom-table">
           <thead>
           
             <tr>
               <td>Name</td>
               <td>Symbol</td>
               <td>Supply</td>
               <td>Token</td>
               <td>Creator</td>
               <td>Price</td>
               <td>Buy</td>
             </tr>
           </thead>

           <tbody>
              {
                array?.map((token,index)=>(
                  <tr key={index+1}>
                   
                    <td>{token?.name}</td>
                    <td>{token?.symbol}</td>
                    <td>{token?.icoSaleBal}</td>
                    <td onClick={()=>copyAddress(token?.token)}>
                      {shortenAddress(token?.token)} 📋
                    </td>
                    <td onClick={()=> copyAddress(token?.creator)}>
                      {shortenAddress(token?.creator)} 📋
                    </td>
                    <td>{token?.price} {currency}</td>
                     <td onClick={()=>(setBuyIco(token),setBuyToken(true))}>
                      <Button name={"Buy"}/>
                     </td>
                  </tr>
                ))
              }
           </tbody>
         </table>
      </div>
  )
};

export default Marketplace;
