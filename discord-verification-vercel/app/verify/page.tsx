 "use client";
import {useState} from "react";
export default function Verify(){
 const [token,setToken]=useState(""); const [status,setStatus]=useState("");
 async function submit(){
   if(!token){setStatus("Complete the security check first.");return}
   setStatus("Checking your connection...");
   const r=await fetch("/api/verify",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({token})});
   const d=await r.json();
   if(d.redirect){location.href=d.redirect;return}
   setStatus(d.error||"Verification could not be started.");
 }
 return <main className="wrap"><section className="card">
 <span className="badge">STEP 1 OF 2</span><h1 className="title">Security Check</h1>
 <p className="muted">You <b>MUST turn off your VPN or proxy</b> before continuing.</p>
 <div className="warning">🛡️ VPN, proxy, and Tor connections may be blocked.</div>
 <div className="turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY||""}
   data-callback={(t:string)=>setToken(t)}></div>
 <button className="btn" onClick={submit}>Continue with Discord</button>
 <div className="status">{status}</div>
 </section></main>}