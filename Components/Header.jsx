import React, { useEffect, useState } from "react";

import Button from "./Button"

const Header = ({

  account ,
  setTokenAddress,
  isAddress,
  setAddress,
  setAccount,
  connectWallet,
  ICO_MARKETPLACE_ADDRESS,
  shortenAddress,
  setOpenAllIco,
  openAllIco,
  setOpenTokenHistory,
  setOpenTokenCreator,
  openTokenHistory,
  openTokenCreator,
  setIcoMarketplaceContract,
  icoMarketplaceContract,

}) => {

  const[isMetaMaskInstalled,setMetaMaskIns] = useState(false);

  useEffect(()=>{
    if(typeof window.ethereum != "undefined"){
      setMetaMaskIns(true);

      window.ethereum.on("accountsChange",handleAccountChange);
    }

    return ()=>{
      if(typeof window.ethereum !== "undefined"){
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountChange
        );
      };
    }
    
  },[isAddress])

  const handleAccountChange = (accounts)=>{
    setAddress(accounts[0]);
  }
  return(
    <header className="header">
       <nav>
          <div className="logo">
            <a href="/">
              ICO.<span> MARKET</span>
            </a>
          </div>

          <input type="checkbox" name="" id="menu-toggle"/>
          <label htmlFor="menu-toggle" className="menu-icon">
            &#9776;
          </label>

          <ul className="menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a 
              onClick={()=> openIcoMarket ? setIcoMarketplaceContract(false) : setIcoMarketplaceContract(true)}>
                ICO Marketplace
              </a>

            </li>
            <li>
              <a 
              onClick={()=> openAllIco ? setOpenAllIco(false) : setOpenAllIco(true)}>
                 Created ICo
              </a>

            </li>
            <li>
              <a 
              onClick={()=> openTokenHistory ? setOpenTokenHistory(false) : setOpenTokenHistory(true)}>
                History
              </a>

            </li>

            <li>
              <a 
              onClick={()=> openTokenCreator ? setOpenTokenCreator(false) : setOpenTokenCreator(true)}>
                Create Ico
              </a>

            </li>
            {
             isAddress ?(
              <li>
                <Button name={'${shortenAddress(isAddress)} : ${account?.slice(0,5)'}  />
              </li>
             ) : (
              <li>
              <button name="connect Wallet"
              handleClick={connectWallet}/>

            </li>
             )
            }
          </ul>
       </nav>
    </header>

  )
};

export default Header;
