// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/ram-manager.js
  
// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/program-manager.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script buys all the programs from the darkweb we can afford so we don't have to do it manually or write them ourselves.");
        ns.tprint("This script dies a natural death all programs are bought.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

    const programNames = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe", "DeepscanV1.exe", "DeepscanV2.exe", "Autolink.exe"];
    const programCosts = [500000, 1500000, 5000000, 30000000, 250000000, 500000, 25000000, 1000000];
    var hasAllPrograms = false;
    while (true) {
        if (hasAllPrograms) {
            break;
        }
        if (!hasTor(ns)) {
            await ns.sleep(2000);
            continue;
        }
        var foundMissingProgram = false;
        for (var i = 0; i < programNames.length; ++i) {
            var prog = programNames[i];
            if (hasProgram(ns, prog)) {
                continue;
            } else {
                foundMissingProgram = true;
            }
            var cost = programCosts[i];
            if (cost <= getPlayerMoney(ns)) {
                ns.purchaseProgram(prog);
            }
        }
        if (!foundMissingProgram) {
            hasAllPrograms = true;
        }
        await ns.sleep(2000);
    }
}

function getPlayerMoney(ns) {
    return ns.getServerMoneyAvailable("home");
}

function hasProgram(ns, program) {
    return ns.fileExists(program, "home");
}

function hasTor(ns) {
    var homeNodes = ns.scan("home");
    return homeNodes.includes("darkweb");
}
