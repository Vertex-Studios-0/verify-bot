export async function telegramLog(text:string){
 const token=process.env.TELEGRAM_BOT_TOKEN, chat=process.env.TELEGRAM_CHAT_ID;
 if(!token||!chat)return;
 await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{
   method:"POST",headers:{"content-type":"application/json"},
   body:JSON.stringify({chat_id:chat,text,parse_mode:"HTML",disable_web_page_preview:true}),
   cache:"no-store"
 }).catch(()=>{});
}