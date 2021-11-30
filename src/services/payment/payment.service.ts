import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {

    constructor(
        private httpService: HttpService,
        ){

    }

    async initializePayment (amount: number): Promise<any>{

        const headers = {
            "Authorization": "Bearer sk_test_b58a55bd59cad312439ea381b785ab0e8ab1a899",
            "Content-Type": "application/json"
        }

        const params = {
            "email": "customer@email.com",
            "amount": (amount * 100)
        }

        try {
            return await firstValueFrom(this.httpService.post(`https://api.paystack.co/transaction/initialize`, params, {headers: headers}
            ))
        } catch (error) {
            throw error;
        }

    }

    async verifyPayment(reference: string): Promise<any>{
        const headers = {
            "Authorization": "Bearer sk_test_b58a55bd59cad312439ea381b785ab0e8ab1a899",
            "Content-Type": "application/json"
        }


        try {
            return await firstValueFrom(this.httpService.get(`https://api.paystack.co/transaction/verify/${reference}`, {headers: headers}
            ))
        } catch (error) {
            throw error;
        }
    }
}
