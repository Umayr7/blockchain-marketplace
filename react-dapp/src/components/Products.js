import React, { useState } from 'react'
import {Container, Button } from 'reactstrap';

import Marketplace from '../Marketplace.json';
import { ethers } from 'ethers'

// Update with the contract address logged out to the CLI when it was deployed 
const marketplaceAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

const Products = (props) => {
    const { products, mounted, setMounted } = props;
    const [error, setError] = useState('');

    // request access to the user's MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function buyProduct(product) {
        purchaseProduct(product).then(response => {
            console.log('then....');
            console.log(response);
            setError('');
        }).catch((e) => {
            console.log('error....');
            console.log(e.data.message);
            setError(e.data.message);
        });
    }

    async function purchaseProduct(product) {
        let prodId = product.id.toNumber();
        let priceNumber = product.price.toNumber();
        let priceStr = priceNumber.toString();
        if(typeof window.ethereum != 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(marketplaceAddress, Marketplace.abi, signer);
            const result = await contract.purchaseProduct(prodId,{ value: ethers.utils.parseEther(priceStr) })
            .catch((e) => {
                console.log('error....');
                console.log(e.data.message);
                setError(e.data.message);
            });
            console.log('purchased...');
            console.log(result);
            await result.wait();


            setMounted(!mounted);
        }
    }

    function hide () {
        console.log('funcc...');
        setTimeout(() => {setError('')}, 3000);
    }
    
    return (
        <Container>
            <div className="container mt-5">
                {error.length>0 && (
                    <div class="alert alert-danger" role="alert">
                        TRANSACTION FAILED: {error}
                        {hide()}
                    </div>
                )}
                <div className="row">
                    {
                        products.map((product) => {
                            return <div className="col-4 mt-4" style={{width:"25%"}}>
                                <div className="card">
                                    <div className="card-body cardnew">
                                        <div style={{marginLeft:"0rem"}}>
                                            <h6 className="card-title" style={{color: "black"}}>Product Name: {product.name}</h6>
                                            <h6 className="card-subtitle mb-2" style={{color: "black"}}>Amount: {product.price.toNumber()} <b>ETH</b></h6>
                                            <h6 className="card-subtitle mb-2" style={{color: "black"}}>Owner ID: <b> {product.owner.substring(0,4)}.....{product.owner.slice(-3)} </b></h6>
                                        </div>
                                        <hr/>
                                        <div style={{textAlign: "end"}}>
                                        <Button onClick={() => purchaseProduct(product)} className="mt-3">
                                            Buy Product
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </Container>
    )
}

export default Products