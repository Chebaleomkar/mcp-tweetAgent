import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {z} from 'zod'

const server = new McpServer({
    name: "example-server",
    version: "1.0.0",
});

// ... set up server resources, tools, and prompts ...

const app = express();

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

server.tool(
    "addTwoNumbers",
    "add numbers and returns sum",
    {
        a: z.number(),     
        b: z.number()
    },
    async (args) => {
        const { a, b } = args;
        return {
            content :[
            {
                type: "text",                           
                text: `The sum of ${a} and ${b} is ${a + b}`
            }
        ]};
    }
);


app.get("/sse", async (_, res) => {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[sessionId];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send("No transport found for sessionId");
    }
});

app.listen(3001 , ()=> console.log("server is running on http://locahost:3001"));
