import { handName } from "../models/HandAtPlay";

export const winsAgainstObj: { [key in handName]: handName[] } = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"]
}