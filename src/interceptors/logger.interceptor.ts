import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";


export class AuthInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("Before")
        return next.handle().pipe(map((resdata)=>{
            const {message=
            "success",data={},status=200}=resdata
            return {
                message,
                data,
                status
            }
        }))
    }
}