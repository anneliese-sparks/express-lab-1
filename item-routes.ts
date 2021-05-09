import express from 'express';
import Item from './item';
const routes = express.Router()

const cartItems: Item [] = [
    {id: 1, product: "Brussel Sprouts", price: 2.5 , quantity: 1},
    {id: 2, product: "Fancy Cucumber", price: 1.25 , quantity: 3},
    {id: 3, product: "Raspberries Fancy", price: 3.0 , quantity: 2},
    {id: 4, product: "Bananas", price: 2.0 , quantity: 1}
];
let nextId: number = 5;

//get-items route
routes.get("/cartItems", (req, res) => {
    res.status(200);
    let maxPrice: number = parseInt(req.query.maxPrice as string);
    let prefix: string = req.query.prefix as string;
    let pageSize: number = parseInt(req.query.pageSize as string);

    let results = cartItems;
    if (maxPrice) {
        results = results.filter(cartItem => cartItem.price <= maxPrice);
    } 
    if (prefix) { 
        prefix = prefix.toLowerCase();
        results = results.filter(cartItem => cartItem.product.toLowerCase().startsWith(prefix));
    }
    if (pageSize < cartItems.length) {
        results = cartItems.slice(0, pageSize);
    }
    res.json(results);
});

//get-items-id route
routes.get("/cartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const item: Item | undefined = cartItems.find(item => item.id === id);
    if (item) {
        res.status(200);
        res.json(item);
    } else {
        res.status(404)
        res.send(`No item found with ID: ${id}`);
    }
});

//post-items route
routes.post("/cartItems", (req, res) => {
    let item: Item = req.body;
    item.id = nextId;
    nextId++;
    cartItems.push(item);
    res.status(201);
    res.json(item);
});

//put-items route
routes.put("/cartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let item: Item = req.body;
    item.id = id;
    const index: number = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems[index] = item;
        res.status(200);
        res.json(item); 
    } else {
        res.status(404);
        res.send(`No item found with ID: ${id}`);
    }
});

//delete-items route
routes.delete("/cartItems/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const index: number = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
    } else
    res.status(204);
    res.send();
});


export default routes;