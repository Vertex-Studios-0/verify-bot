const API="https://discord.com/api/v10";
export function discordLoginUrl(){
 const p=new URLSearchParams({
   client_id:process.env.DISCORD_CLIENT_ID||"",
   redirect_uri:`${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/callback`,
   response_type:"code",scope:"identify"
 }); return `https://discord.com/oauth2/authorize?${p}`;
}
export async function exchange(code:string){
 const body=new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID||"",client_secret:process.env.DISCORD_CLIENT_SECRET||"",grant_type:"authorization_code",code,redirect_uri:`${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/callback`});
 const r=await fetch(`${API}/oauth2/token`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body}); return r.json();
}
export async function user(token:string){
 const r=await fetch(`${API}/users/@me`,{headers:{Authorization:`Bearer ${token}`}}); return r.json();
}
export async function addRole(userId:string){
 const guild=process.env.DISCORD_GUILD_ID!, role=process.env.DISCORD_VERIFIED_ROLE_ID!, bot=process.env.DISCORD_BOT_TOKEN!;
 const r=await fetch(`${API}/guilds/${guild}/members/${userId}/roles/${role}`,{method:"PUT",headers:{Authorization:`Bot ${bot}`}});
 return r.ok;
}