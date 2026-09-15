import crypto from "node:crypto";
export function getClientIp(r:Request){return (r.headers.get("x-forwarded-for")||r.headers.get("x-real-ip")||"unknown").split(",")[0].trim()}
function sign(v:string){return crypto.createHmac("sha256",process.env.INTERNAL_SECRET||"missing").update(v).digest("hex")}
export function makeState(ip:string){const p=Buffer.from(JSON.stringify({exp:Date.now()+600000,ip:sign(ip)})).toString("base64url");return p+"."+sign(p)}
export function verifyState(s:string,ip:string){const[a,b]=s.split(".");if(!a||!b)return false;const e=sign(a);if(b.length!==e.length||!crypto.timingSafeEqual(Buffer.from(b),Buffer.from(e)))return false;try{const p=JSON.parse(Buffer.from(a,"base64url").toString());return p.exp>Date.now()&&p.ip===sign(ip)}catch{return false}}
export function escapeHtml(v:string){return v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]!))}
