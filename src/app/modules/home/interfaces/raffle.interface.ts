import { Tickect } from "./ticket.interface";

export interface Raffle {
  _id?: string,
  amountNumber: number,
  avatar: string,
  user: any,
  name: string,
  price: number,
  slug: string,
  description: string,
  tickects: Tickect[]

}
