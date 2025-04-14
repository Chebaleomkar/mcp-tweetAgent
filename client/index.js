import readline from 'readline/promises';
import { config } from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { stdin as input, stdout as output } from 'node:process';
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"

config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const mcpClient = new Client({
    name : "example-client",
    version : "1.0.0",
})

let tools = []
const chatHistory = [];
const rl = readline.createInterface({ input, output });

mcpClient.connect(new SSEClientTransport( new URL('http://localhost:3001/sse')))
.then(async()=>{
    console.log('connected to mcp')
    const tools = (await mcpClient.listTools()).tools.map(tool =>{
        return {
            name : tool.name,
            description: tool.description,
            parameters : {
                type : tool.inputSchema.type,
                properties : tool.inputSchema.properties,
                required : tool.inputSchema.required
            }
        }
    })
    console.log({tools})
})

async function chatLoop() {
    const question = await rl.question('🧑: ');
    chatHistory.push({
        role: 'user',
        parts: [
            {
                text: question,
                type: 'text'
            }
        ],
    });

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: chatHistory,
    });
    const responseMessage = response.candidates[0].content.parts[0].text
    console.log('🤖  '+   responseMessage);

    chatHistory.push({
        role : 'model',
        parts : [
            {
                text : responseMessage,
                type : 'text'
            }
        ]
    })
    chatLoop(); // loop again
}

await chatLoop();
