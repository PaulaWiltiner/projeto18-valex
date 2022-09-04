import { Card, findByTypeAndEmployeeId, insert, update } from "../repositories/cardRepository";
import { Company, findByApiKey } from "../repositories/companyRepository";
import { Employee, findById } from "../repositories/employeeRepository";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import { amountPayment, findByCardIdInPayment } from "../repositories/paymentRepository";
import { amountRecharge, findByCardIdInRecharge } from "../repositories/rechargeRepository";
import verifications from "../utils/verifications";

export async function create(apiKey:string, data:any){

  const findKey : Company = await findByApiKey(apiKey)
  if(!findKey){
    throw {code:'NotFound' , message:'x-api-key not found'}
  }

  const findEmployee : Employee = await findById(data.employeeId)
  if(!findEmployee){
    throw {code:'NotFound' , message:'employee not found'}
  }

  const findTypeEmployee : Card = await findByTypeAndEmployeeId(data.type, data.employeeId)
  if(findTypeEmployee ){
    throw {code:'Conflict' , message:'card already exists'}
  }

  const number : string = faker.finance.creditCardNumber('################');

  const strList : string[]= findEmployee.fullName.split(' ');
  const newStrList :  string[]=[];
  strList.forEach((item,index) => {
    if(item.length>=3){
      if(index>0 && index <strList.length-1){
        newStrList.push(item[0])
      }else{
        newStrList.push(item)
      }
    }
  })
  const cardholderName = newStrList.join(' ');

  const expirationDate = dayjs().add(5, 'year').format("MM/YY");

  const cvc : string = faker.finance.creditCardCVV();
  const cryptr = new Cryptr('cardTotallySecretKey');
  const securityCode = cryptr.encrypt(cvc);

  const cardData = {
    employeeId:data.employeeId,
    number: number,
    cardholderName: cardholderName,
    securityCode: securityCode,
    expirationDate: expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: data.type
  }

  await insert(cardData)
}

export async function activation(cardId:number,cvc:string,password:string){

  const findCard=await verifications(cardId,true,true,true,false)

  if(findCard.password!==null){
    throw {code:'Conflict' , message:'password already registered'}
  }

  const cryptr = new Cryptr('cardTotallySecretKey');
  const decryptedCvc = cryptr.decrypt(findCard.securityCode);

  if(decryptedCvc!==cvc){
    throw {code:'UnprocessableEntity' , message:'incorrect cvc'}
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  
  await update(cardId, {password:hashPassword})

}

export async function balanceAndTransactions(cardId:number){
  await verifications(cardId,true,false,false,false)


  const {paymentotal} : {paymentotal:string}= await amountPayment(cardId)
  const {rechargetotal} : {rechargetotal:string}= await amountRecharge(cardId)

  const balance = Number(rechargetotal)-Number(paymentotal);

  const transactions = await findByCardIdInPayment(cardId);
  const recharges = await findByCardIdInRecharge(cardId);

  const result = {
    balance,
    transactions,
    recharges
  }

  return result


}

export async function block(cardId:number,password:string){

  const findCard=await verifications(cardId,true,true,false,true)

  
  if (!bcrypt.compareSync( password,findCard.password)) {
    throw {code:'UnprocessableEntity' , message:'incorrect password'}
  }

  await update(cardId, {isBlocked:true})

}

export async function unlock(cardId:number,password:string){

  const findCard=await verifications(cardId,true,true,false,true)

  
  if (!bcrypt.compareSync(password,findCard.password)) {
    throw {code:'UnprocessableEntity' , message:'incorrect password'}
  }

  await update(cardId, {isBlocked:false})
}