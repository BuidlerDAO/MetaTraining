import { abi } from '@/apis/abi';
import toast from '@/ui/toast/toast';
import { getCookie, setCookie } from '@/utils/cookie';
import { switchWeb3ChainId } from '@/utils/web3';
import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';

export default function HomeBanner() {
  // 合约地址
  const contractAddress = '0xB8d30C0246d67Dc1aD419596f68d7a0cDad09060';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  // 合约调用
  async function ContractCall() {
    // 连接到以太坊测试网络
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getNetwork().then(async (network) => {
      if (network.chainId != 5) {
        await switchWeb3ChainId(5);
      }

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const signer = provider.getSigner();
      const cookieAddress = getCookie('address');
      if (signer._address == null || cookieAddress == undefined) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsLoggedIn(true);
        } catch (error: any) {
          toast.error(error.message);
        }
      }
      const contractWithSigner = contract.connect(signer);
      try {
        await contractWithSigner.claim().then(() => {
          toast.success('succeed!');
        });
      } catch (error: any) {
        const message = error.message;
        if (message.includes('execution reverted')) {
          const start = message.indexOf('execution reverted:') + 19;
          const end = message.indexOf(',', start);
          const errorMessage = message.slice(start, end - 1);
          toast.error(errorMessage); // 这里会打印 "Address has already claimed tokens"
        }
      }
    });
  }
  const getAddress = async (provider: ethers.providers.Web3Provider) => {
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      if (address.length > 0) {
        setIsLoggedIn(true);
        setWalletAddress(address);
        toast.success(
          `logined: ${address.substring(0, 6)}...${address.substring(
            address.length - 4
          )}`
        );
        setCookie('address', address, 120);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        getAddress(provider);
      } else {
        toast.warning('Please install MetaMask!');
      }
    }
    firstLoad.current = false;
  }, []);

  return (
    <div className="relative h-[150px] w-full">
      <div className="flex w-full items-start justify-start">
        <button
          className="m-3 rounded-md bg-blue-600 py-2 px-3 font-mono text-base text-white"
          onClick={() => ContractCall()}
        >
          {isLoggedIn ? 'Claim' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
}
