import express from 'express';
import cartItems from './item-routes';
import cors from "cors";

const routes = express.Router();



const app = express();
app.use(express.json())
app.use("/", cartItems)
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(cors());

export default cartItems;