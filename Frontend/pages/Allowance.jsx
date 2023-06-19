import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useEffect } from "react";

Moralis.start({
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVmNGIxMzkyLTQ2MmYtNDAxNi1iNjZiLThiNDU1ZGIzZDkyZiIsIm9yZ0lkIjoiMTE1NTU1IiwidXNlcklkIjoiMTE1MjAxIiwidHlwZUlkIjoiNjhmM2FkMDctYmYwOC00ODhlLWI5MDUtY2ZiZjFhODkxZmFhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODY5MjE3MzAsImV4cCI6NDg0MjY4MTczMH0.DoxVy4nUDreyYrFyoX6vzzWjSUZYb-5Lb1RFLku-Aps',
    // ...and any other configuration
  });
  
const Allowance =  () => {
 useEffect(()=>{
    const allowanceData = async () => {

        const chain = EvmChain.ETHEREUM;
        const address = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
        const ownerAddress = "0x7c470D1633711E4b77c8397EBd1dF4095A9e9E02";
        const spenderAddress = "0xed33259a056f4fb449ffb7b7e2ecb43a9b5685bf";
      
        const response = await Moralis.EvmApi.token.getTokenAllowance({
          address,
          chain,
          ownerAddress,
          spenderAddress,
        });
        console.log(response.toJSON());
    }
    allowanceData();
 }, []);

};

export default Allowance;