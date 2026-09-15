export async function verifyTurnstile(token:string,ip?:string){
 const secret=process.env.TURNSTILE_SECRET_KEY;
 if(!secret) return {success:false,error:"Turnstile is not configured"};
 const r=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{
   method:"POST",headers:{"content-type":"application/json"},
   body:JSON.stringify({secret,response:token,...(ip?{remoteip:ip}:{})}),
   cache:"no-store"
 });
 return await r.json();
}