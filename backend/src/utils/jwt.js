import envsConfig from "../config/envs.config.js";
import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const { id, email } = user;

  const token = jwt.sign({ id, email }, envsConfig.SECRET_KEY, { expiresIn: "60m" });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, envsConfig.SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};
