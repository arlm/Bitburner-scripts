let gitUsername = "arlm";
let repoName = "Bitburner-scripts";
let branchName = "main";
let json_filename = "install_files_json.txt";

/** @param {NS} ns **/
export async function main(ns) {
  const args = ns.flags([["help", false]]);
  if (args.help || args._.length > 1) {
    ns.tprint(
      "This script downloads all tools ans scripts to the 'home' server."
    );
    ns.tprint(`Usage: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    return;
  }

  if (ns.getHostname() !== "home") {
    throw new Exception("Run the script from home");
  }

  downloadFile(ns, "src/tools/analyze-server.js");
  downloadFile(ns, "src/tools/analyze-server.js");
  downloadFile(ns, "src/tools/basic-hack.js");
  downloadFile(ns, "src/tools/buy-programs.js");
  downloadFile(ns, "src/tools/buy-ram.js");
  downloadFile(ns, "src/tools/buy-tor.js");
  downloadFile(ns, "src/tools/cascade-kill.js");
  downloadFile(ns, "src/tools/custom-stats.js");
  downloadFile(ns, "src/tools/deploy.js");
  downloadFile(ns, "src/tools/find-coding-conctract.js");
  downloadFile(ns, "src/tools/find-server.js");
  downloadFile(ns, "src/tools/monitor.js");
  downloadFile(ns, "src/tools/node-manager.js");
  downloadFile(ns, "src/tools/opened-servers.js");
  downloadFile(ns, "src/tools/server-stats.js");
  downloadFile(ns, "src/tools/update-scripts.js");
}

async function downloadFile(ns, filename) {
  const path = getBaseUrl() + filename;
  const save_filename =
    !filename.startsWith("/") && filename.includes("/")
      ? "/" + filename
      : filename;

  try {
    ns.print("wget " + path + " -> " + save_filename);
    await ns.wget(path + "?ts=" + new Date().getTime(), save_filename);
  } catch (e) {
    ns.tprint(`ERROR (tried to download  ${path})`);
    throw e;
  }
}

function getBaseUrl() {
  return `https://raw.githubusercontent.com/${gitUsername}/${repoName}/${branchName}/`;
}
