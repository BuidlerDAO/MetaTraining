import Tooltip from '@/ui/tooltip';
import { setCookie } from '@/utils/cookie';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Login: React.FC = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setProvider(provider);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
  };

  const getAddress = async (provider: ethers.providers.Web3Provider) => {
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setCookie('address', address, 120);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (provider && isLoggedIn) {
      getAddress(provider);
    }
  }, [provider, isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center justify-end">
          <Tooltip
            trigger={['hover']}
            showArrow={false}
            placement="bottom"
            overlayInnerStyle={{
              marginTop: '0px',
              padding: 0
            }}
            overlay={
              <div className="ml-3 rounded bg-white py-1 px-3 text-black">
                <button onClick={logout}>Logout</button>
              </div>
            }
          >
            <div className="flex h-16 items-center justify-end hover:text-black">
              <button className="rounded bg-blue-500 py-1 px-3 text-white">
                {walletAddress.substring(0, 6)}...
                {walletAddress.substring(walletAddress.length - 4)}
              </button>
            </div>
          </Tooltip>
        </div>
      ) : (
        <button
          className="rounded bg-blue-500 py-1 px-3 text-white"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Login;
