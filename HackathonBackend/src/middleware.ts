import { NextFunction, Request, Response } from "express";
import { JWT_PASS } from "./config";
import jwt from "jsonwebtoken";

 export const userMiddleWare = (req : Request, res : Response, next : NextFunction) =>{
    const header = req.headers["authorization"];
    console.log(header);
    try{
        const decoded = jwt.verify(header as string, JWT_PASS);
        console.log(decoded);
        if(decoded){
            // @ts-ignore
            req.userId = decoded.id;
            next();
        }else{
            res.status(403).json({
                message : "Please log in first"
            })
        }
    }catch(e : any){
        res.json({
            message : "Wrong userId or password"
        })
    }

}