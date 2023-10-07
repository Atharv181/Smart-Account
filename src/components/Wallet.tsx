import { useEffect, useRef, useState } from "react";
import SocialLogin from "@biconomy/web3-auth";
import { ethers, providers } from "ethers";
import { ChainId } from "@biconomy/core-types";
import { BiconomySmartAccount, BiconomySmartAccountConfig } from "@biconomy/account";
import { bundler, paymaster } from "@/constants";

export default function Wallet(){
    const sdkRef = useRef<SocialLogin | null>(null);
    const [interval, enableInterval] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [, setProvider] = useState<providers.Web3Provider>();
    const [smartAccount, setSmartAccount] = useState<BiconomySmartAccount>();

    useEffect(() =>{
        let configureLogin: NodeJS.Timeout | undefined;
        if (interval){
            configureLogin = setInterval(() =>{
                if(!!sdkRef.current?.provider){
                    setupSmartAccount();
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
            setupSmartAccount();
        }
    }

    async function setupSmartAccount() {
        try {
            if (!sdkRef.current?.provider) {
                return; 
            }
            //It will hide the wallet if it is already open
            sdkRef.current.hideWallet();

            setLoading(true);

            let web3Provider = new ethers.providers.Web3Provider(
                sdkRef.current.provider
            );
            setProvider(web3Provider);
            const config : BiconomySmartAccountConfig = {
                signer : web3Provider.getSigner(),
                chainId : ChainId.POLYGON_MUMBAI,
                bundler : bundler,
                paymaster : paymaster,
            };

            const smartAccount = new BiconomySmartAccount(config);
            await smartAccount.init();

            setSmartAccount(smartAccount);
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    }

    async function logOut() {
        await sdkRef.current?.logout();
        sdkRef.current?.hideWallet();
      
        setSmartAccount(undefined);
        enableInterval(false);
      }
}
