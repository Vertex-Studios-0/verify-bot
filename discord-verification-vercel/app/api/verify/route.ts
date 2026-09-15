import {NextResponse} from "next/server";
import {rateLimit} from "@/lib/rate-limit";
import {verifyTurnstile} from "@/lib/turnstile";
import {checkIP} from "@/lib/ip-check";
import {discordLoginUrl} from "@/lib/discord";
import {telegramLog} from "@/lib/telegram";

export const runtime="nodejs";
function ip(req:Request){return (req.headers.get("x-forwarded-for")||"").split(",")[0].trim()||"unknown"}

export async function POST(req:Request){
 const address=ip(req);
 if(!rateLimit(`verify:${address}`,5,60_000)) return NextResponse.json({error:"Too many attempts. Please wait."},{status:429});
 let body:any; try{body=await req.json()}catch{return NextResponse.json({error:"Invalid request"},{status:400})}
 if(typeof body.token!=="string"||body.token.length>2048)return NextResponse.json({error:"Invalid security token"},{status:400});
 const ts=await verifyTurnstile(body.token,address);
 if(!ts.success)return NextResponse.json({error:"Security check failed. Please try again."},{status:403});
 const sec=await checkIP(address);
 if(sec.vpn||sec.proxy||sec.tor||sec.hosting){
   await telegramLog(`🚫 <b>VERIFICATION BLOCKED</b>\\nIP: <code>${address}</code>\\nVPN: ${sec.vpn?"⚠️ YES":"❌ NO"}\\nProxy: ${sec.proxy?"⚠️ YES":"❌ NO"}\\nTor: ${sec.tor?"⚠️ YES":"❌ NO"}\\nHosting: ${sec.hosting?"⚠️ YES":"❌ NO"}`);
   return NextResponse.json({error:"VPN/proxy/Tor or a datacenter connection was detected. You MUST turn off your VPN and try again."},{status:403});
 }
 await telegramLog(`🛡️ <b>SECURITY CHECK PASSED</b>\\nIP: <code>${address}</code>`);
 return NextResponse.json({redirect:discordLoginUrl()});
}