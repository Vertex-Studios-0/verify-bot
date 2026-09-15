const hits = new Map<string,{n:number,reset:number}>();
export function rateLimit(key:string,limit=10,windowMs=60_000){
 const now=Date.now(); const x=hits.get(key);
 if(!x||x.reset<now){hits.set(key,{n:1,reset:now+windowMs});return true}
 if(x.n>=limit)return false; x.n++; return true;
}