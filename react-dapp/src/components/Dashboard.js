import { useEffect, useState, Fragment } from 'react';
import Marketplace from '../Marketplace.json';
import { ethers } from 'ethers'
import AddProduct from './AddProduct';
import Products from './Products';

// Update with the contract address logged out to the CLI when it was deployed 
const marketplaceAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [mounted, setMounted] = useState(false);

    // request access to the user's MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    useEffect(async() => {
            console.log('use effect');
            await loadState();

        // eslint-disable-next-line
    }, [mounted]);

    async function loadState () {
        setProducts([]);
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(marketplaceAddress, Marketplace.abi, signer);
        const count = await contract.productCount();

        for(var i = 1;i<=count; i++){
            const product = await contract.products(i);
            setProducts(products => [...products, product]);
        }
    }

    return (
        <Fragment>
            <AddProduct setMounted={setMounted} mounted={mounted} />
            <Products products={products} setMounted={setMounted} mounted={mounted} />
        </Fragment>
    )
}

export default Dashboard