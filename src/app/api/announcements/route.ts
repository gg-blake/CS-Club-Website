export async function GET(request: Request) {
    return new Response(process.env.DISCORD_API_TOKEN)
}