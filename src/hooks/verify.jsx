import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

const app_id = "app_758ba4e53a64678b4cb6227f4b5d2f77";
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
