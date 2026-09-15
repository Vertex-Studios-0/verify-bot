export type IPCheck={vpn:boolean;proxy:boolean;tor:boolean;hosting:boolean;provider?:string};
export async function checkIP(ip:string):Promise<IPCheck>{
 const url=process.env.IP_INTEL_API_URL, key=process.env.IP_INTEL_API_KEY;
 if(!url||!key) return {vpn:false,proxy:false,tor:false,hosting:false};
 const controller=new AbortController(); const t=setTimeout(()=>controller.abort(),3500);
 try{
   const r=await fetch(url,{headers:{Authorization:`Bearer ${key}`,"x-api-key":key},signal:controller.signal,cache:"no-store"});
   const d:any=await r.json();
   // Map your provider's response here.
   return {vpn:!!d.vpn,proxy:!!d.proxy,tor:!!d.tor,hosting:!!(d.hosting||d.datacenter),provider:d.provider};
 }catch{return {vpn:false,proxy:false,tor:false,hosting:false}}
 finally{clearTimeout(t)}
}