import CryptoJS from "crypto-js";

const BACKEND_SECRET =
  process.env.BACKEND_SECRET || "mybackendsecret";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(
    data,
    BACKEND_SECRET 
  ).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    BACKEND_SECRET
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};