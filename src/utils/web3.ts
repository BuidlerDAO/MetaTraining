import toast from '@/ui/toast/toast';
import { ethers } from 'ethers';

/**
 * @description 验证钱包登陆
 * @returns {Promise<String>}
 */
export const isInstallMetamask = async () => {
  const docEl = document.documentElement;
  if (docEl.clientWidth <= 768 && !window.ethereum)
    return toast.error('Oops, please use Metamask Scan or use PC browser!', {
      id: 'status500'
    });
  if (docEl.clientWidth > 768 && !window.ethereum)
    return toast.error('Oops, please install Metamask', { id: 'status500' });
  return;
};

/**
 * @description 验证钱包登陆
 * @returns {Promise<String>}
 */
export const checkMetamaskConnection = async () => {
  isInstallMetamask();
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts) return true;
      return false;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

/**
 * @description 获取所有账号列表
 * @returns {Promise<String>}
 */
export const getWeb3Account = async () => {
  isInstallMetamask();
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      return accounts;
    } catch (error) {
      return [];
    }
  } else {
    return [];
  }
};

/**
 * @description 获取签名
 * @params msg sing message
 * @returns {Promise<String>}
 */
export const getWeb3SignMessage = async (msg: string) => {
  isInstallMetamask();
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const Singer = provider.getSigner();
      const sig = await Singer.signMessage(msg);
      return sig;
    } catch (error) {
      return '';
    }
  } else {
    return '';
  }
};

/**
 * @description 获取网络
 * @params chainId
 */
export const getWeb3ChainId =
  async function getNetworkChainId(): Promise<number> {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    return network.chainId;
  };

/**
 * @description 切换网络
 * @params chainId
 */
export const switchWeb3ChainId = async (chainId: number) => {
  const chainIdHex = ethers.utils.hexValue(chainId);
  if (window.ethereum) {
    try {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `${chainIdHex}`
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * @description 处理地址
 * @params address
 */
export const checkAddress = (address: string): string => {
  let ret = '';
  const hash_0x = ethers.utils.keccak256(address.toLowerCase());
  console.log('hash', hash_0x);
  // hash_0x.replace(/^0x/i, '');
  const addressHash = hash_0x.replace(/^0x/i, '');

  for (let i = 0; i < address.length; i++) {
    if (parseInt(addressHash[i], 16) > 7) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  console.log(ret);

  return ret;
};

/**
 * @description 监听账号变化
 */
export const acountChanged = (cb) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.on('accountsChanged', function (accounts) {
    console.log(accounts);
    const acount = accounts[0];
    cb(acount);
  });
};
