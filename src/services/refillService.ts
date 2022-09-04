
import dayjs from "dayjs";
import { insert} from "../repositories/rechargeRepository";
import verifications from "../utils/verifications";


export async function refill(cardId:number,amount:number){

  await verifications(cardId,true,true,true,false,false)

  const dataList = {
    cardId ,
    amount
  }
  await insert(dataList)
}
