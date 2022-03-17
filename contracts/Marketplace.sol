//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Marketplace {
    // model for product block...
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    
    constructor() {
        name = "Initial contructor name called";
    }

    // Event for createProduct
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );
    function createProduct(string memory _name, uint _price) public {
        console.log("create product func...");
        console.log("Name in func: ", _name);
        console.log("Price in func: ", _price);
        // Require a valid name
        require(bytes(_name).length > 0);
        
        // Require a valid price
        require(_price > 0);
        
        // Increment Product Count 
        productCount++;

        // Create a Product
        products[productCount] = Product(
            productCount, _name, _price,
            msg.sender, false
        );


        
        // Trigger Event
        emit ProductCreated(productCount, _name, _price,
            msg.sender, false);
            
        // console.log("Price in func: %s", products[0].name);
    }

    function purchaseProduct(uint _id) public payable {
        console.log("purchase product func...");
        console.log("func id: %s", _id);

        //Fetch the product
        Product memory _product = products[_id];
        console.log("name in func: %s", _product.name);

        //Fetch the owner
        address _seller = _product.owner;

        //Make sure the product has valid id

        require(_product.id > 0 && _product.id <= productCount);

        //Require that there is enough Ether in transaction

        require(msg.value >= _product.price);

        //Require that the product has not been purchased already
        // require(!_product.purchased);

        // Required that buyer is not the seller
        require(_seller != msg.sender, "Can't Buy your own product!");

        //Transfer ownership to the buyer

        _product.owner = msg.sender;

        //Mark as purchased

        _product.purchased = true;
        
        //Update the product

        products[_id] = _product;

        // Pay the seller by sending them Ether
        payable(_seller).transfer(msg.value);
        

        //Trigger an event

        emit ProductPurchased(productCount,_product.name,_product.price,msg.sender,true);
    }
    function test() public view {
            console.log("this is a test function");
    }
}