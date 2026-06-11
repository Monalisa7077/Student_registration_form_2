import CryptoJS from "crypto-js";

const FRONTEND_SECRET = "myfrontendsecret";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(
    data,
    FRONTEND_SECRET
  ).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    FRONTEND_SECRET
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};