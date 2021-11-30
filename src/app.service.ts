import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService { 

  getHello(): string {
    return 'Hello World!';
  }

  getHome(): string{
    return `
      <div style="
        font-weight: bold; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 100%; 
        flex-direction: column;
        color: rgb(100, 100, 100);
        height : 100vh">

        <h1>NEST API</h1>
        <h6>Version 1.0</h6>

      </div>
    `
  }

}
