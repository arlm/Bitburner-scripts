// From KehL

const host = ns.getHostname();
const h4ckscript = "kh4ck.js";
const we4kscript = "kwe4k.js";
const kgr0wscript = "kgr0w.js";

const purchasedServers = await ns.getPurchasedServers();
await copyScripts(purchasedServers);

async function copyScripts(purchasedServers) {
  for (let i = 0; i < purchasedServers.length; i++) {
    await ns.scp(h4ckscript, host, purchasedServers[i]);
    await ns.scp(we4kscript, host, purchasedServers[i]);
    await ns.scp(kgr0wscript, host, purchasedServers[i]);
  }
}
