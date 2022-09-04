
import dayjs from "dayjs";
import { insert} from "../repositories/rechargeRepository";
import verifications from "../utils/verifications";


export async function refill(cardId:number,amount:number){

  const findCard=await verifications(cardId,true,true,true,false)

  if(!findCard){
    throw {code:'NotFound' , message:'card not found'}
  }

  const diffDate=dayjs(findCard.expirationDate).diff(dayjs().format('MM/YY'),'month',true);
  if(diffDate<0){
    throw {code:'UnprocessableEntity' , message:'expired card'}
  }

  const dataList = {
    cardId ,
    amount
  }
  await insert(dataList)
}
