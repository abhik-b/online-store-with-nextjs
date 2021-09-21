import CommerceSDK from "@chec/commerce.js";

const commerce = new CommerceSDK(process.env.NEXT_CHEC_PUBLIC_KEY);
export default commerce;
