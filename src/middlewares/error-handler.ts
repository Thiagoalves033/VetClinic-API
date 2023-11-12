import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({msg: 'Something went wrong, please try again', error: err})
}

export = errorHandler
