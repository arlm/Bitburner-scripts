// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/tor-manager.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script buys the TOR router ASAP another script so that another script can buy the port breakers.");
		ns.tprint("This script dies a natural death once TOR is bought.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

    const torCost = 200000;
    var hasTorRouter = false;
    while (true) {
        if (hasTorRouter) {
            break;
        }
        if (hasTor(ns)) {
            hasTorRouter = true;
        } else {
            if (torCost <= getPlayerMoney(ns)) {
                ns.purchaseTor();
            }
        }
        await ns.sleep(200);
    }
}

function getPlayerMoney(ns) {
    return ns.getServerMoneyAvailable("home");
}

function hasTor(ns) {
    var homeNodes = ns.scan("home");
    return homeNodes.includes("darkweb");
}