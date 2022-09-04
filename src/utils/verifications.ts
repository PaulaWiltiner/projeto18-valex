import { Card, findByCardId } from "../repositories/cardRepository";
import dayjs from "dayjs";


export default async function verifications(cardId:number,one:boolean,two:boolean,three:boolean,four:boolean){
  const findCard: Card =  await findByCardId(cardId);
  if(!findCard && one ){
    throw {code:'NotFound' , message:'card not found'}
  }

  const diffDate=dayjs(findCard.expirationDate).diff(dayjs().format('MM/YY'),'month',true);
  if(diffDate<0 && two){
    throw {code:'UnprocessableEntity' , message:'expired card'}
  }

  if(findCard.password===null && three){
    throw {code:'Conflict' , message:'card is not actived'}
  }

  if(findCard.isBlocked && four){
    throw {code:'Conflict' , message:'card already  blocked'}
  }

  return findCard
}