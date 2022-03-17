import React, { Fragment, useState } from 'react';
import { ethers } from 'ethers';
import { Form, Label, Input, FormGroup, Button, Container } from 'reactstrap';

import Marketplace from '../Marketplace.json';
import './Product.css'

const marketplaceAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const AddProduct = (props) => {
    const [name, setName] = useState()
    const [amount, setAmount] = useState();

    const { setMounted, mounted } = props;

    // request access to the user's MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function addProduct() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('name: ', name);
            console.log('amount: ', amount);
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(marketplaceAddress, Marketplace.abi, signer);
            const result = await contract.createProduct(name, amount);
            await result.wait();
            console.log('result...');
            console.log(result);
            const count = await contract.productCount();
            console.log("count : ",count.toNumber());
            for(var i = 1;i<=count; i++){
                const product = await contract.products(i)
                console.log("Product : ",product);
            }
            setMounted(!mounted);
        }
    }

    return (
        <Fragment>
                <div className="banner d-flex">
                        <Container className="w-75 mt-2 mb-3 py-4" style={{ borderRadius:"15px"}}> 
                    <div className="d-flex">
                    <div className="mx-auto py-5">
                    <Form style={{textAlign: "center", color:"white", marginTop:"-10px"}}>
                        <h3 className="mt-5" style={{marginLeft:"3rem",color:"white",fontWeight:"bold"}}>
                            ADD PRODUCT
                        </h3>
                        <FormGroup>
                            <Label for="exampleEmail" style={{color: "white", marginTop:"20px", marginLeft:"10%"}}>
                                Product Name
                            </Label>
                            <Input
                                onChange={e => setName(e.target.value)}
                                style={{marginLeft:"10%"}}
                                id="exampleEmail"
                                name="name"
                                placeholder="product name"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" style={{color: "white", marginTop:"20px", marginLeft:"10%"}}>
                                Product Amount
                            </Label>
                            <Input
                                onChange={e => setAmount(e.target.value)}
                                style={{marginLeft:"10%"}}
                                id="examplePassword"
                                name="price"
                                placeholder="product price"
                                type="text"
                            />
                        </FormGroup>
                        <div style={{textAlign: "center"}}>
                        <Button onClick={addProduct} style={{marginLeft: "3rem"}} className="mt-3">
                            Add Product
                        </Button>
                        </div>
                    </Form>
                    </div>
                    
                </div> 
                    
                </Container>
                </div>
        </Fragment>
    )
}

export default AddProduct