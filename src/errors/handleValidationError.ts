import mongoose from "mongoose";
import { IGenericErrorMessage } from "../app/interfaces/error";
import { IGenericErrorResponse } from "../app/interfaces/common";

const handleValidationError = (err: mongoose.Error.ValidationError) : IGenericErrorResponse => {
    const errors:IGenericErrorMessage[] = Object.values(err.errors).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: el.path,
            statusCode,
            message: 'Validation Error',
            errorMessages: errors
        }
    })

    const statusCode = 400;
}

export default handleValidationError;