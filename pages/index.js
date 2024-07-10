import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast"

import {useStateContext} from "../Context/index";
import Header from "../Components/Header.jsx";
import Button from "../Components/Button.jsx";
import TokenBuy from "../Components/BuyToken.jsx";
import card from "../Components/Card.jsx";
import CreateICO from "../Components/CreateICO.jsx";
import Footer from "../Components/Footer.jsx";
import ICOMarket from "../Components/ICOMarket.jsx";
import Input from "../Components/Input.jsx";
import Loader from "../Components/Loader.jsx";
import MarketPlace from "../Components/Marketplace.jsx";
import PreSale from "../Components/PreSaleList.jsx";
import WithToken from "../Components/WidthdrawToken.jsx";
import UploadLogo from "../Components/UploadLogo.jsx";
import TokenTransfer from "../Components/TokenTransfer.jsx";
import TokenHis from "../Components/TokenHistory.jsx"
import TokenCreator from "../Components/TokenCreator.jsx";
import Table from "../Components/Table.jsx";
import SaleListPre from "../Components/PreSaleList.jsx";
import { ICO_MARKETPLACE_ABI, PINATA_API_KEY, PINATA_SECRET_KEY, shortenAddress } from "../Context/constants";
import { isAddress } from "ethers/lib/utils.js";
import Card from "../Components/Card.jsx";


const index = () => {
  const {
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    withdraw_token,
    transfer_token,
    setTransfer,
    buyToken,
    createIcoSale,
    Get_all_Ico_Sale,
    GET_ALL_USER_ICO_SALE_TOKEN,
    createERC20,
    openBuyToken,
    setOpenBuyToken,
    openWithdrawToken,
    setOpenWithdrawToken,
    openCreateIco,
    setOpenCreateIco,
    isAddress,
    setIsAddress,
    loader,
    setLoader,
    currency,
    shortenAddress,reCall} = useContext();

    const notifySuccess = (msg) => toast.success(msg,{duration:200});
    const notifyError = (msg) => toast.error(msg,{duration:200});

    const[allIco,setAllIco] = useState();
    const[allUserIcons,setAllUserIcons] = useState();

    // COMPONENT OPEN

    const[openAllIco,setOpenAllIco] = useState(false);
    const[openTokenHistory,setOpenTokenHistory] = useState(false);
    const[openIcoMarketPlace,setOpenICOMarketPlace] = useState(false);
    
    //BUY ICO TOKEN

    const[buyIco,setBuyIco] = useState();

    const copyAddress = ()=>{
      navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
      notifySuccess("copied Successfully");
    }

    useEffect(()=>{
      if(isAddress){
        Get_all_Ico_Sale().then((token)=>{
          setAllIco(token);
        });

        Get_all_User_Ico_Sale().then((token)=>{
          setAllUserIcons(token);
        });
      }
    },[isAddress,recall]);
  return (
    <div>
      <Header 
      account = {account}
      setAddress={setAddress}
      setTokenAddress={setTokenAddress}
      isAddress={isAddress}
      setAccount={setAccount}
      connectWallet = {connectWallet}
      ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
      shortenAddress={shortenAddress}
      setOpenAllIco={setOpenAllIco}
      openAllIco={openAllIco}
      setOpenTokenHistory={setOpenTokenHistory}
      setOpenTokenCreator={setOpenTokenCreator}
      openTokenHistory={openTokenHistory}
      openTokenCreator={openTokenCreator}
      openIcoMarketPlace={openIcoMarketPlace}
      setOpenICOMarketPlace={setOpenICOMarketPlace}
    
      />

      <div className="create">
        <h1 style={{fontSize:"2rem"}}>All ICO MarketPlace</h1>
      

      {
        allIco?.length != 0 && (
          <MarketPlace array={allIco}
          shortenAddress={shortenAddress} setBuyIco={setBuyIco}
          setBuyToken={setBuyToken}
          currency={currency}/>
        )
      }
      <Card setAllIco={setAllIco}
           setTokenCreator={setTokenCreator}
          setOpenTokenHistory={setOpenTokenHistory}
          setOpenWithdrawToken={setOpenWithdrawToken}
          setOpenICOMarketPlace={setOpenICOMarketPlace}
          copyAddress={copyAddress}
          setCreateIco={setCreateIco}
           />
    </div>

      {
        openAllIco && <ICOMarket array={allIco}
        shortenAddress={shortenAddress} handleClick={setAllIco}
        currency={currency}/>
      }
      {
        openTokenHistory && (
          <TokenHis
          shortenAddress={shortenAddress}
          setOpenTokenHistory={setOpenTokenHistory}/>
        )
      }
      {
        openTokenCreator && (
          <TokenCreator
          createERC20={createERC20}
          shortenAddress={shortenAddress}
          setTokenCreator={setTokenCreator}
          setLoader={setLoader}
          isAddress={isAddress}
          connectWallet={connectWallet}
          PINATa_SECRET_KEY={PINATA_SECRET_KEY}
          PINATA_API_KEY={PINATA_API_KEY}/>
        )
      }
      
      {
        !openCreateIco && <CreateICO shortenAddress={shortenAddress} 
        setOpenCreateIco={setOpenCreateIco} 
        connectWallet={connectWallet}
        isAddress={isAddress}
        Create_ICO_SALE={Create_ICO_SALE}/>
      }
      {
        openIcoMarketPlace && <MarketPlace array={allUserIcons}
        shortenAddress={shortenAddress} handleClick={setOpenICOMarketPlace}
        currency={currency}/>
      }
      {
        openBuyToken && <TokenBuy 
        isAddress={isAddress} 
        buyToken={buyToken}
        connectWallet={connectWallet}
        setOpenBuyToken={setOpenBuyToken}
        buyIco={buyIco}
        currency={currency}/>
      }
      {
        openTransferToken &&<TokenTransfer
        isAddress={isAddress} 
        transfer_token={transfer_token}
        connectWallet={connectWallet}
        setTransfer={setTransfer}/>
      }
      {
        openWithdrawToken && <WithToken 
        isAddress={isAddress}
        withdraw_token={withdraw_token}
        connectWallet={connectWallet}
        setOpenWithdrawToken={setOpenWithdrawToken}/>
      }

      <Footer />
       {
        !loader && <Loader/>
      }

      
      // <Loader/>
    </div>
  )
};

export default index;
