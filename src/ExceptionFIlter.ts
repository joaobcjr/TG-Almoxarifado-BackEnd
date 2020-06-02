/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof HttpException) {

            const result = JSON.parse(JSON.stringify(exception.getResponse().valueOf()));

            response.status(exception.getStatus()).json({
                status: exception.getStatus(),
                message: result.message instanceof Array ? result.message : [result.message],
                error: HttpStatus[exception.getStatus()]
            })

            //response.status(exception.getStatus()).json(exception.getResponse());
        }
        else if (exception instanceof QueryFailedError) {
            const result = JSON.parse(JSON.stringify(exception));
            let httpStatus;

            switch (result.code) {
                case "23505":
                    httpStatus = HttpStatus.CONFLICT;
                    break;
                default:
                    httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            }

            response.status(httpStatus).json({
                status: httpStatus,
                message: [
                    result.detail,
                    exception.message,
                ],
                error: HttpStatus[httpStatus]

            });

        }
        else {
            const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

            response.status(500).json({
                status: httpStatus,
                message: exception.message,
                error: HttpStatus[httpStatus]

            });

        }



    }
}