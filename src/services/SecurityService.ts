import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class SecurityService {
     private static readonly TOKEN_SECRET_KEY: string = 'SuperSecRetKey'

     static generatePasswordHash(password: string): string {
          let salt = bcrypt.genSaltSync(10);
          // шифруем пароль
          let hash = bcrypt.hashSync(password, salt)
          return hash;
     }

     static validatePassword(password: string, hash: string): boolean {
          return bcrypt.compareSync(password, hash);
     }

     static generateToken(payload: string | object) : string {
          let token = jwt.sign(payload, this.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
          //console.log("Token: " + token)
          return token;
     }

     static verifyToken(token: string): any {
          if (token == null || token == "" || token === undefined) return null;
          try{
               let error: any, data: any = jwt.verify(token, this.TOKEN_SECRET_KEY);
               if (error) {
                   console.log(error);
                   return null;
               }
               return data;
          }
          catch(e){
               console.log(e);
               return null;
          }
     }

      
}