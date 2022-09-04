
import bcrypt from "bcrypt";
import { Business, findById } from "../repositories/businessRepository";
import { amountPayment, insert } from "../repositories/paymentRepository";
import { amountRecharge } from "../repositories/rechargeRepository";
import verifications from "../utils/verifications";

export async function purchaseInPOS(cardId:number,password:string,businessId:number,amount:number){

  const findCard=await verifications(cardId,true,true,true,true)

  if (!bcrypt.compareSync(password,findCard.password)) {
    throw {code:'UnprocessableEntity' , message:'incorrect password'}
  }

  const business : Business = await findById(businessId)
  if(!business){
    throw {code:'UnprocessableEntity' , message:'business not found'}
  }

  if(business.type===findCard.type){
    throw {code:'UnprocessableEntity' , message:'business and card are not the same type'}
  };

  const {paymentotal} : {paymentotal:string}= await amountPayment(cardId)
  const {rechargetotal} : {rechargetotal:string}= await amountRecharge(cardId)

  if(Number(rechargetotal)-Number(paymentotal) < amount){
    throw {code:'UnprocessableEntity' , message:'insufficient funds'}
  }

  const dataList = {
    cardId,
    businessId,
    amount
  }

await insert(dataList)

}

