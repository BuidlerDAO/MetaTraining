import { abi } from '@/apis/abi';
import Bg from '@/assets/website/cool_background.svg';
import toast from '@/ui/toast/toast';
import TypingText from '@/ui/typingText';
import { getCookie, setCookie } from '@/utils/cookie';
import { switchWeb3ChainId } from '@/utils/web3';
import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';

export default function HomeBanner() {
  // 合约地址
  const contractAddress = '0xB8d30C0246d67Dc1aD419596f68d7a0cDad09060';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  // 合约调用
  async function ContractCall() {
    // 连接到以太坊测试网络
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
        } catch (error) {
          console.log(error);
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
        getAddress(provider);
      } else {
        toast.warning('Please install MetaMask!');
      }
    }
    firstLoad.current = false;
  }, []);

  return (
    <div
      className="relative h-[700px] w-full"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundPosition: 'center 100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute top-1/3 left-1/2 w-full translate-x-[-50%] translate-y-[-50%] px-[2rem] text-sm md:px-20">
        <div className="h-40"></div>
        <div className="mt-[10rem] mb-20 text-center text-6xl font-bold text-white">
          <TypingText
            text="MetaTraining"
            speed={100}
            className="font-mono text-[50px] text-white"
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="rounded-md bg-blue-600 py-3 px-4 font-mono text-xl text-white"
            onClick={() => ContractCall()}
          >
            {isLoggedIn ? 'Claim' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
}
