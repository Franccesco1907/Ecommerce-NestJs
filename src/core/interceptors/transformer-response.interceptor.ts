import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";

export class TransformerResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;
    return next.handle().pipe(
      map(data => {
        return {
          statusCode,
          result: data,
        };
      }),
      catchError(error => {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const response = {
          result: null,
          statusCode: status,
          message: error.message || 'Internal server error',
        }
        return throwError(() => new HttpException(response, status));
      })
    );
  }
}