import React, { useEffect } from "react";

import toast from "react-hot-toast";

const TokenHistory = ({shortenAddress,setOpenTokenHistory}) => {

  
  const notifySuccess = (msg) => toast.success(msg,{duration:200});
  const notifyError = (msg) => toast.error(msg,{duration:200});

  const copyAddress = (text)=>{
    navigator.clipboard.writeText(text);
    notifySuccess("Address copied to clipboard");
  };

  const[history,setHistory] = useEffect(null);

  useEffect(()=>{
    const storeData = localStorage.getItem("TOKEN_HISTORY");

    if(storeData){
      setHistory(JSON.parse(storeData));
    }
  },[]);
  return (
    <div className="model">
      <div className="model-content">
        <span onClick={()=> setOpenTokenHistory(false)} className="close">
           &times;
        </span>
        <h2>Token History</h2>
        <div className="table-container">
           <table className="custom-table">
             <thead>
             
               <tr>
                 <td>Logo</td>
                 <td>Name</td>
                 <td>Symbol</td>
                 <td>Supply</td>
                 <td>Supply</td>
                 <td>Address</td>
                 <td>Hash</td>
               </tr>
             </thead>

             <tbody>
                {
                  hisory?.map((token,index)=>(
                    <tr key={index+1}>
                      <td onClick={()=> navigator.clipboard.writeText(token?.logo)}>
                        <img src={token?.logo || "theblockchaincoders.jpg"} alt="logo" style={{
                          width: "25px",
                          height: "auto",
                          borderRadius:"10px"
                        }} />
                      </td>
                      <td>{token?.name}</td>
                      <td>{token?.symbol}</td>
                      <td>{token?.supply}</td>
                      <td onClick={()=>copyAddress(token?.tokenAddress)}>
                        {shortenAddress(token?.tokenAddress)} 📋
                      </td>
                      <td onClick={()=> copyAddress(token?.transactionHash)}>
                        {shortenAddress(token?.transactionHash)} 📋
                      </td>
                    </tr>
                  ))
                }
             </tbody>
           </table>
        </div>
      </div>
    </div>
  )
};

export default TokenHistory;
