// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/cascade-kill.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script kills all scripts running on any server in the game.");  
        ns.tprint("It saves the host that you run it on for last, so that it doesn't kill itself prematurely.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}
    
    var startingNode = ns.getHostname();
    
    var hostsToScan = [];
    hostsToScan.push(startingNode);
    var serverList = [];
    
    // assemble a server list.
    while (hostsToScan.length > 0) {
        var hostName = hostsToScan.pop();
        if (!serverList.includes(hostName)) {
            var connectedHosts = ns.scan(hostName);
            for (var i = 0; i < connectedHosts.length; i++) {
                hostsToScan.push(connectedHosts[i]);
            }
            serverList.push(hostName);
        }
    }
    
    for (var s = 0; s < serverList.length; s++) {
        // skip if this host, we save it for last
        if (serverList[s] == startingNode)
            continue;
            
        // skip if not running anything
        if (ns.ps(serverList[s]) === 0)
            continue;
            
        // kill all scripts
        ns.killall(serverList[s]);
    }
    
    // idle for things to die
    for (var x = 0; x < serverList.length; x++) {
        // skip if this host, we save it for last
        if (serverList[x] == startingNode)
            continue;
        // idle until they're dead, this is to avoid killing the cascade before it's finished.
        while (ns.ps(serverList[x]) > 0) {
            await ns.sleep(20);
        }
    }
    
    // wait to kill these. This kills itself, obviously.
    ns.killall(startingNode);
}