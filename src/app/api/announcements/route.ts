import { APIMessage, RESTGetAPIChannelMessageResult } from "discord-api-types/v10";

export async function GET(request: Request) {
    const headers = {
      'Authorization': `Bot ${process.env.DISCORD_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
    const response = await fetch(`https://discord.com/api/v9/channels/${process.env.DISCORD_CHANNEL_ID}/messages?limit=10`, { headers })
    
    const json = await response.json()
    return new Response(JSON.stringify(json), {
      headers: { 'content-type': 'application/json' },
    })
  }