// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/farm-stats.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script returns a list of our server farm capabilities.");  
        ns.tprint("It prints a list of purchased servers, their value in money, and the ram they are using versus the total ram available.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

    const ramCostConstant = 55000;

    var serverNameList = ns.getPurchasedServers();
    ns.tprint("--==-- Server Farm Stats --==--");
    for (var s = 0; s < serverNameList.length; s++) {
        var box = serverNameList[s];
        var ram = ns.getServerRam(box);
        var maxRam = ram[0];
        var currentRam = ram[0] - ram[1];
        var cost = maxRam * ramCostConstant;
        ns.tprint(box + " Ram: " + currentRam + " / " + maxRam + " --==-- Cost: $" + cost);
    }
}
