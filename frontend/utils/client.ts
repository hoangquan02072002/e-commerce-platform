// client.ts
import FingerprintJS from "@fingerprintjs/fingerprintjs";
async function getVisitorId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log("Visitor ID:", result.visitorId);
  return result.visitorId;
}
export default getVisitorId;
