import { NextFunction, Request, Response } from "express";
import { CreateItemDto } from "../../dtos/item";
import { HttpException } from "../../exceptions/httpException";
import DB from "../../database";
import { ItemController } from "../../controllers/itemController";
import { ItemService } from "../../services/ItemService";

describe('item controller', () => {

    const itemController = new ItemController(new ItemService());

    afterAll(()=>{
        DB.sequelize.close();
    })

    let req: Partial<Request> = {};
    let res: Partial<Response> = {
        status: function (code:number):Response {
            this.statusCode = code;
            return this as Response;
        },
        json: jest.fn()
    };

    let next: Partial<NextFunction> = jest.fn((err: HttpException)=>{
        res.statusCode = 500;
    });

    const itemData: CreateItemDto = {
        title:'title',
        price:200,
        description:'descr',
        userId:1
    }
    req.body = itemData;

    it('complete body, statusCode should be 201', (done) => {
        itemController.storeItem(req as Request, res as Response, next as NextFunction)
        .then(()=>{
            expect(res.statusCode).toBe(201);
            done()
        })
    })

    it('incomplete body, status code should be 500', (done) => {
        const {title, price, description} = {...itemData}
        req.body = {title, price, description};
        itemController.storeItem(req as Request, res as Response, next as NextFunction)
        .then(()=>{
            expect(res.statusCode).toBe(500);
            done()
        })
    })

})