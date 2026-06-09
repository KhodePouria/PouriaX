import { $ } from "bun"
import fs from "node:fs"
import process from "node:process"


const user = process.env.deploymentUser
const host = process.env.deploymentHostName
const path = process.env.deploymentPath
const release = process.env.deploymentFileName

if (!user || !host || !path || !release) {
  console.log("Deployment variables are not set!")
  process.exit(1)
}

try {
  const files = [".next", "package.json"]
  if (fs.existsSync("bun.lockb")) files.push("bun.lockb")
  if (fs.existsSync("bun.lock")) files.push("bun.lock")

  /*  await $`bun run build` */
  await $`tar -czf ${release} ${files}`
  await $`scp ${release} ${user}@${host}:${path}`
  await $`ssh ${user}@${host} -t '
    set -e
    cd ${path};
    rm -rf .next package.json package-lock.json bun.lockb bun.lock;
    tar -xzf ${release};
    rm -rf ${release}
    ;
  '`
  await $`rm -rf ${release}`
  console.log("Project got deployed!")
}
catch (e) {
  console.error(e)
  console.error("Deployment Failed.")
}
