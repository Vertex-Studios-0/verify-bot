import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
export function middleware(req:NextRequest){
 const p=req.nextUrl.pathname;
 if(p.startsWith("/api/")){const cl=req.headers.get("content-length");if(cl&&Number(cl)>10000)return new NextResponse("Payload too large",{status:413});}
 return NextResponse.next();
}
export const config={matcher:["/api/:path*"]};