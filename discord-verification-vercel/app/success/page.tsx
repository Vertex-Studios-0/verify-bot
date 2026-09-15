export default function Success(){return <main className="wrap"><section className="card">
<span className="badge">VERIFIED</span><h1 className="title">✅ Verification Complete</h1>
<p className="muted">Your Discord account has been verified. Redirecting you to Discord...</p>
<a className="btn" href="https://discord.gg/handshake">Return to Discord</a>
</section><script dangerouslySetInnerHTML={{__html:`setTimeout(()=>location.href="https://discord.gg/handshake",1800)`}}/></main>}