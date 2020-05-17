export default class SecurityService{
    static generatePasswordHash(password: string) : string{
        return '';
   }

   static validatePassword(password: string, hash: string): boolean{
        return true;
   }
}