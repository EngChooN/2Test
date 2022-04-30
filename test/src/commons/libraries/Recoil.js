import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const basketsCountState = atom({
  key: "basketsCountState",
  default: Number(0),
});

export const productEditState = atom({
  key: "productEditState",
  default: false,
});
