import { useEffect, useRef, useState } from "react";
import SocialLogin from "@biconomy/web3-auth";

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
}











