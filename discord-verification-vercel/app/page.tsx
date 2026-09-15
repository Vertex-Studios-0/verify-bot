import Link from "next/link";
export default function Home(){return <main className="wrap"><section className="card">
<span className="badge">SECURE VERIFICATION</span>
<h1 className="title">Verify your Discord account</h1>
<p className="muted">Complete the security checks before joining the server.</p>
<div className="warning"><b>⚠️ YOU MUST TURN OFF YOUR VPN</b><br/>VPNs, proxies, and Tor connections are not permitted during verification.</div>
<Link className="btn" href="/verify">Start Verification</Link>
</section></main>}