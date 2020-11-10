import express from "express"
import ssr from './ssr/ssr';
const path = require("path")
const app = express();
const renderAt = "localhost:8081";

app.get('/', async (req, res, next) => {

    const url = `${req.protocol}://${renderAt}`;

    const {html, ttRenderMs} = await ssr(url);
    // Add Server-Timing! See https://w3c.github.io/server-timing/.
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
    return res.status(200).send(html); // Serve prerendered page as response.
  });
  
app.listen(8001, () => {
    console.log("server started at http://localhost:8001 🚀")
})