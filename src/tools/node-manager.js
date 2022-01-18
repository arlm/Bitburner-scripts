// From: https://github.com/MercuriusXeno/BitBurnerScripts/blob/master/node-manager.js

/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
	if (args.help || args._.length > 1) {
		ns.tprint("This script handles hacknet nodes for us.");  
        ns.tprint("The primary reason for doing it at all is simply for netburner augs.");
		ns.tprint(`Usage: run ${ns.getScriptName()}`);
		ns.tprint("Example:");
		ns.tprint(`> run ${ns.getScriptName()}`);
		return;
	}

    const hn = ns.hacknet;
    var options = ["level", "ram", "core", "node"];
    while(true) {
        var maxNodes = hn.numNodes();
        var needsNode = false;
        if (maxNodes === 0) {
            needsNode = true;
            maxNodes = 1;
        }
        for (var i = 0; i < maxNodes; i++) {
            for (var o = (needsNode ? 3 : 0); o < options.length; o++) {
                var allowancePercentage = 0.00001;
                var playerMoney = ns.getServerMoneyAvailable("home");
                var costOfThing = 0;
                switch(o) {
                    case 0:
                        costOfThing = hn.getLevelUpgradeCost(i, 1);
                        break;
                    case 1:
                        costOfThing = hn.getRamUpgradeCost(i, 1);
                        break;
                    case 2:
                        costOfThing = hn.getCoreUpgradeCost(i, 1);
                        break;
                    case 3:
                        costOfThing = hn.getPurchaseNodeCost();
                        break;
                }
                
                var shouldPurchase = playerMoney * allowancePercentage >= costOfThing;
                if (shouldPurchase) {
                    switch(o) {
                        case 0:
                            hn.upgradeLevel(i, 1);
                            break;
                        case 1:
                            hn.upgradeRam(i, 1);
                            break;
                        case 2:
                            hn.upgradeCore(i, 1);
                            break;
                        case 3:
                            hn.purchaseNode()
                            break;
                    }  
                }
            }
        }
        await ns.sleep(10);
    }
}