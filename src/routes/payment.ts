import { program } from "commander";
import {createDeposit} from "../commands/payment/createPayment";
import {withdraw} from "../commands/payment/withdraw";

const payment = program.command("payment").description("storage providers");



payment.command("deposit <from> <to> <amount>")
    .description(" deposit from owner's account to the payment account ")
    .action(async (from,to,amount) => {
        await createDeposit(from,to,amount)
    });

payment.command("withdraw <fromAddress> <amount>")
    .description("withdraw from a payment account to owner's account")
    .action(async (fromAddress:string, amount:string)=>{
        await withdraw(fromAddress,amount)
    })
export default payment;
