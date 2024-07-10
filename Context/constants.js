import {ethers} from "ethers"
import Web3Model from "web3modal"

import ERC20Generator from "./ERC20Generator.json"
import icoMarketplace from "./icoMarketplace.json"

export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

export const ERC20Generator_ADDRESS = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const ICO_MARKETPLACE_ABI = icoMarketplace.abi;

export const PINATA_API_KEY = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

//NETWORK

const network = {
    polygon_amoy:{
        chainId:'0x{Number(80002).toString(16)}',
        chainName:"Polygon Amoy",
        NativeCurrency:{
            name:"MATIC",
            symbol:"MATIC",
            decimals:18
        },
        rpcUrls:["https://rpc.ankr.com/polygon_amoy"],
        blockExplorer:["https://www.oklink.com/amoy"],
    },
    polygon:{
        chainId:'0x{Number(137).toString(16)}',
        chainName:"Polygon Mainnet",
        NativeCurrency:{
            name:"MATIC",
            symbol:"MATIC",
            decimals:18
        },
        rpcUrls:["https://rpc.ankr.com/polygon"],
        blockExplorer:["https://polygonscan.com/"],
    },
    bsc:{
        chainId:'0x{Number(56).toString(16)}',
        chainName:"Binance Mainnet",
        NativeCurrency:{
            name:"Binance Chain",
            symbol:"BNB",
            decimals:18
        },
        rpcUrls:["https://rpc.ankr.com/bsc"],
        blockExplorer:["https://bscscan.com/"],
    },
    Ethereum:{
        chainId:'0x{Number(8453).toString(16)}',
        chainName:"Base Mainnet",
        NativeCurrency:{
            name:"ETH",
            symbol:"ETH",
            decimals:18
        },
        rpcUrls:["https://mainnet.base.org"],
        blockExplorer:["https://bscscan.com/"],
    },

}

const changeNetwork = async({networkName}) =>{
    try{
        if(!window.ethereum) throw new Error("No crypto wallet found");
        await window.ethereum.request({
            method:"Wallet_addEthereumChain",
            params:[
                {
                    ...network[networkName],
                },
            ],
        });
    }catch(error){
        console.log(error);
    }
}

export const handleNetworkSwitch = async () =>{
    const networkName = "polygon_amoy";
    await changeNetwork({networkName});
};

export const shortenAddress = (address)=> '{address?.slice(0,5)}...${address?.length- 4}';

// CONTRACT 

const fetchContract = (address,abi,signer) =>{
    new ethers.Contract(address,abi,signer);
}

export const ICO_MARKETPLACE_CONTRACt = async ()=>{
    try{
        const web3Model = new Web3Model();
        const connection = await web3Model.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = fetchContract(
            ICO_MARKETPLACE_ABI,
            ICO_MARKETPLACE_ADDRESS,
            signer
        );

        return contract;
    }catch(error){
        console.log(error);
    }
};

// TOKEN Contract

export const TOKEN_CONTRACT = async (TOKEN_ADDRESS)=>{
    try{
        const web3Model = new Web3Model();
        const connection = await web3Model.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = fetchContract(
            ERC20Generator_ABI,
            TOKEN_ADDRESS,
            signer
        ); 

        return contract;


        return contract;
    }catch(error){
        console.log(error);
    }
};

