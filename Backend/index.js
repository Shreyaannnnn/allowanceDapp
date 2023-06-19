
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/approvals", async (req, res) =>{

    const { query } = req;

    const options = {
        method: "GET",
        headers : {
            accept: "application/json",
            "X-API-Key": process.env.MORALIS_KEY,
        },
    };

    const walletAddresses = [query.wallet];

    const response = await fetch(
       `https://deep-index.moralis.io/api/v2/erc20/approvals?chain=mumbai&wallet_addresses=${walletAddresses}`, options 
    )

    if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);  
    } else {
        return res.status(400).json();
    }

});


app.listen(port, () => {
    console.log("Listening for Requests");
})

