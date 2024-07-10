import React, { createContext, useContext, useEffect, useState } from "react";
import {ethers} from"ethers";
import Web3Model from "web3model"
import toast from "react-hot-toast"

//Internal Import

import{ERC20Generator,ERC20Generator_BYTECODE,handleNetworkSwitch,shortenAddress,ICO_MARKETPLACE_CONTRACt,ICO_MARKETPLACE_ADDRESS,TOKEN_CONTRACT,PINATA_API_KEY,PINATA_SECRET_KEY, ERC20Generator_ABI} from"./constants";


const StateContext = createContext();

export const StateContextProvider = ({children}) =>{
    const[address,setAddress] = useState();
    const[accountBalance,setAccountBalance] = useState(null);
    const[loader,setLoader] = useState(false);
    const[reCall,setRecall] = useState(0);
    const[currency,setCurrency] = useState("MATIC");

    //COMPONENT

    const[openBuyToken,setOpenBuyToken] = useState(false);
    const[openWithdrawToken,setOpenWithdrawToken] = useState(false);
    const[transferToken,setTransfer] = useState(false);
    const[tokenCreator,setTokenCreator] = useState(false);
    const[createIC,setCreateIco] = useState(false);

    const notifySuccess = (msg) => toast.success(msg,{duration:200});
    const notifyError = (msg) => toast.error(msg,{duration:200});

    // FUNCTIONS

    const checkIfWalletConnected = async()=>{
        try{
            if(!window.ethereum) return notifyError("No Account Find");
            await handleNetworkSwitch();
            const accounts = await window.ethereum.request({method:"eth_accounts"});

            if(accounts.length){
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(connection);
                const balance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(balance);
                setAccountBalance(bal);
                return accounts[0];
            }else{
                notifyError("No Account Found");
            }
        }catch(error){
            console.log(error);
            notifyError("Np Account Found");
        }
    }

    const connectWallet = async()=>{
        try{
            if(!window.ethereum) return notifyError("No Account Find");
            await handleNetworkSwitch();
            const accounts = await window.ethereum.request({method:"eth_requestAccounts"});

            if(accounts.length){
                setAddress(accounts[0]);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(accounts[0]);
                const bal = ethers.utils.formatEther(balance);
                setAccountBalance(bal);
                return accounts[0];
            }else{
                notifyError("No Account Found");
            }
        }catch(error){
            console.log(error);
            notifyError("Np Account Found");
        }
    }

    useEffect(()=>{
         handleNetworkSwitch();
    },[address])

    // MAIN FUNCTION

    const deployContract = async(signer,account,name,symbol,supply,imageURL)=>{
        try{
            const factory = new ethers.ContractFactory(
                ERC20Generator_BYTECODE,
                ERC20Generator_ABI,
                signer
            );

            const totalSupply  = Number(supply);
            const initialSupply = ethers.utils.parseEther(
                totalSupply.toString(),
                "ether"
            );

            let contract = await factory.deploy(initialSupply,name,supply);

            const transaction = await contract.deployed();

            if(contract.address){
                const today = Date.now();
                let date = Date(today);
                const tokenCreateDate = date.toLocaleDateString("en-US");

                const token = {
                    account:account,
                    name:name,
                    symbol:symbol,
                    supply:supply.toString(),
                    transactionHash:contract.deployTransaction.hash,
                    tokenAddress:contract.address,
                    createdAt:tokenCreateDate,
                    logo:imageURL,
                };

                let tokenHistory = [];
                const history = localStorage.getItem("TOKEN_HISTORY");
                if(history){
                    tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
                    tokenHistory.push(token);
                    localStorage.setItem("TOKEN_HISTORY",tokenHistory);
                    setLoader(false);
                    setRecall(reCall+1);
                    setTokenCreator(false);
                }else{
                    
                    tokenHistory.push(token);
                    localStorage.setItem("TOKEN_HISTORY",tokenHistory);
                    setLoader(false);
                    setRecall(reCall+1);
                    setTokenCreator(false);
                }
            }
        }
    catch(error){
        setLoader(false);
        notifyError("SomeThing Went Wrong");
        console.log(error);
       
    }}

    const createERC20 = async(token,account,imageURL)=>{
        const{name,symbol,supply} = token;
        try{
            setLoader(true);
            notifySuccess("Crating token..")
            if(!name || !symbol || !supply){
                notifyError("Data Missing")
            }else{
                const web3Model = new Web3Model();
               const connection = await web3Model.connect();
                const provider = new ethers.providers.Web3Provider(connection);

               const signer = provider.getSigner();
               deployContract(signer,account,name,symbol,supply,imageURL);
            }
        
        }
    catch(error){
        setLoader(false);
        notifyError("Something Went Wrong");
        console.log(error);
       
    }
    }

    const Get_all_Ico_Sale = async()=>{
        try{
            setLoader(true);
            const address = await connectWallet();
            const contract  = await ICO_MARKETPLACE_CONTRACt();

            if(address){
                const allIcoSaleToken = await contract.getTokenCreatedBy(address);

                const tokenArray = Promise.all(
                    allIcoSaleToken.map(async (token) => {
                        const tokenContract = await TOKEN_CONTRACT(token?.token);

                        const balance = await tokenContract.balanceOf(
                            ICO_MARKETPLACE_ADDRESS
                        );

                        return{
                            creator:token.creator,
                            token:token.token,
                            name:token.name,
                            symbol:token.symbol,
                            supported:token.supported,
                            price:ethers.utils.formatEther(token?.prive.toString()),
                            icoSaleBal:ethers.utils.formatEther(balance.toString())
                        };
                    })
                );

                setLoader(false);
                return tokenArray;
            }
        }catch(error){
            setLoader(false);
            notifyError("Something Went Wrong");
            console.log(error);
        }
     }

    const GET_ALL_USER_ICO_SALE_TOKEN = async()=>{
        try{

        }
    catch(error){
        console.log(error);
       
    }
     }
     const Create_ICO_SALE = async(icoSale)=>{
        try{
            const {address,price} = icoSale;
            if(!address | !price){
                return notifyError("Data is Missing")
            }

            setLoader(true);
            notifySuccess("Creating IcoSale....");
            await connectWallet();

            const contract  = await ICO_MARKETPLACE_CONTRACt();

            const payAmount = ethers.utils.parseUnits(price.toString(),"ether");

            const transaction = await contract.createICOSale(address,payAmount,{
                gasLimit:ethers.utils.hexlify(80000000),
            })

            await transaction.wait();

            if(transaction.hash){
                setLoader(false);
                setCreateIco(false);
                setRecall(reCall+1);
            }
        }
    catch(error){
        setLoader(false);
        setCreateIco(false);
        notifySuccess("Some thing went wrong");
        console.log(error);
       
    }
     }

     const buyToken = async(tokenAddress,tokenQuentity)=>{
        try{
            setLoader(true);
            notifySuccess("Buying token....");
            
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACt();

            const tokenBal = await contract.getBalance(tokenAddress);
            const tokenDetails = await contract.getTokenDetails(tokenAddress);

            const avaliableToken = ethers.utils.formatEther(tokenBal.toString());

            if(avaliableToken > 0){
                const price = ethers.utils.formatEther(tokenDetails.price.toString()) * Number(tokenQuentity);

                const payAmount = ethers.utils.parseUnits(price.toString(),"ether");

                const transaction = await contract.buyToken(
                    tokenAddress,
                    Number(tokenQuentity),{
                        value:payAmount.toString(),
                    gasLimit:ethers.utils.hexlify(80000000),
                  }
                );

                await transaction.wait();
                setLoader(false);
                setRecall(reCall+1);
                setOpenBuyToken(false);
                notifySuccess("Token Purchased Successfully");
                
            }else{
                setLoader(false);
                setOpenBuyToken(false);
                notifyError("Insufficient Token Balance");
            }
        }
    catch(error){
        setLoader(false);
        setOpenBuyToken(false);
        notifyError("Some thing went wrong");
        console.log(error);
       
    }
     }

     const transfer_token = async(transferTokenData)=>{
        try{
              if(!transferTokenData.address || !transferTokenData.amount || !transferTokenData.tokenAddress){
                  return notifyError("Data is Missing")
                }

            setLoader(true);
            notifySuccess("Transfering token....");

            const address = await connectWallet();
            const contract = await TOKEN_CONTRACT(transferTokenData.tokenAddress);
            const avalibleBalance = await contract.balanceOf(address);
            const avalibleToken = ethers.token.formatEther(avalibleBalance.toString());

            if(avalibleToken> 1){
                const payAmount = ethers.utils.parseUnits(transferTokenData.address,payAmount,{
                    gasLimit:ethers.utils.hexlify(80000000),
                });

                await transaction.wait();
                setLoader(false);
                setRecall(reCall+1);
                setTransfer(false);
                notifySuccess("transaction completed successfully");
            }else{
                await transaction.wait();
                setLoader(false);
                setRecall(reCall+1);
                setTransfer(false);
                notifyError("your balance is 0");
                
            }
        }catch(error){
        setLoader(false);
        setRecall(reCall+1);
        setTransfer(false);
        notifyError("Some thing went wrong");
        console.log(error);
       
    }
}

     const withdraw_token = async(withdrawQuentity)=>{
        try{

            if(!withdrawQuentity.amount || withdrawQuentity.token){
                return notifyError("Data is Missing")
            }

            setLoader(true);
            notifySuccess("Withdrawing token....");
            const address = await connectWallet();
            const contract = await ICO_MARKETPLACE_CONTRACt();

            const payAmount = ethers.utils.parseUnits(
                withdrawQuentity.token.toString(),
                "ethers"
            );

            const transaction = await contract.withdrawToken(
                withdrawQuentity.token,
                payAmount,
                {
                    gasLimit: ethers.utils.hexlify(80000000),
                }
            );

            await transaction.wait();
            setLoader(false);
            setRecall(reCall+1);
            setOpenWithdrawToken(false);
            notifySuccess("Transaction completed successfully");

        }catch(error){
            setLoader(false);
            setRecall(reCall+1);
            setOpenWithdrawToken(false);
            notifyError("Some thing went wrong");
    
        console.log(error);
       
    }
     }
    return <StateContext.Provider value={{
        PINATA_API_KEY,
        PINATA_SECRET_KEY,
        withdraw_token,
        transfer_token,
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
        shortenAddress,reCall,
        setTransfer

        
        
    }}>{children}</StateContext.Provider>
}

export const useStateContext = ()=> useContext(StateContext);
