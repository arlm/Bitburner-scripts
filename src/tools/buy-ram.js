// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/ram-manager.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script upgrades the RAM on the 'home' machine ASAP whenever enough money is available.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

    // this runs forever, it always runs. as long as utilization is high enough, we want more ram.
    while (true) {
        // if our utilization rates are below half, we don't necessarily need more RAM
        if (ns.getUpgradeHomeRamCost() <= ns.getServerMoneyAvailable("home")) {
            ns.upgradeHomeRam();
        }
        await ns.sleep(2000);
    }
}
