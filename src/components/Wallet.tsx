import { useEffect, useRef, useState } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";

export default function Wallet(){
    const sdkRef = useRef<SocialLogin | null>(null);
    const [interval, enableInterval] = useState<boolean>(false);

    useEffect(() =>{
        let configureLogin: NodeJS.Timeout | undefined;
        if (interval){
            configureLogin = setInterval(() =>{
                if(!!sdkRef.current?.provider){
                    clearInterval(configureLogin);
                }
            }, 1000);
        }
    }, [interval]);

    async function login(){
        if(!sdkRef.current){
            const socialLoginSDK = new SocialLogin();
            await socialLoginSDK.init({
                chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
                network: "testnet",
            });
            sdkRef.current = socialLoginSDK;
        }

        if(!sdkRef.current.provider){
            sdkRef.current.showWallet();
            enableInterval(true);
        } else {
            console.log("hello");
        }
    }
}












