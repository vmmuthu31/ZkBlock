import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

const app_id = "app_e98efdb2faa9a49679dc04274c40aac1";
const action = "zkblock";

export async function verify(proof, signal) {
  const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
  if (verifyRes.success) {
    return { success: true };
  } else {
    return {
      success: false,
      code: verifyRes.code,
      attribute: verifyRes.attribute,
      detail: verifyRes.detail,
    };
  }
}
