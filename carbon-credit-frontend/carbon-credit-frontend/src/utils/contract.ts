import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abi/contractABI.json";
import { useWallet } from "../components/WalletContext"; // Import your context

const CONTRACT_ADDRESS = "0xb3e497afCaB81fFb7690e3157D03715F0580B391";

/**
 * Hook to return an instance of the connected contract.
 */
export const useContract = () => {
  const { signer } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (signer) {
      try {
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error("🚨 Failed to create contract instance:", error);
        setContract(null);
      }
    } else {
      setContract(null);
    }
  }, [signer]);

  return contract;
};
