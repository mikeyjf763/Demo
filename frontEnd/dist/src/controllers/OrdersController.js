"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const tsoa_1 = require("tsoa");
const orderSchema_1 = require("../models/orderSchema");
let OrdersController = class OrdersController {
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield orderSchema_1.OrderModel.find();
            if (!documents) {
                throw new Error('No orders found');
            }
            const orders = documents.map(doc => ({
                id: doc.id,
                items: doc.items.map((item) => ({
                    item: item.item,
                    quantity: item.quantity,
                })),
                total: doc.total,
            }));
            return orders;
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield orderSchema_1.OrderModel.findById(orderId);
            if (!document) {
                throw new Error('Order not found');
            }
            const order = {
                id: document.id,
                items: document.items.map((item) => ({
                    item: item.item,
                    quantity: item.quantity,
                })),
                total: document.total,
            };
            return order;
        });
    }
    createOrder(newOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new orderSchema_1.OrderModel(newOrder);
            console.log(order);
            console.log('hit');
            yield order.save();
        });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, tsoa_1.Get)()
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, tsoa_1.Get)('{orderId}')
], OrdersController.prototype, "getOrderById", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], OrdersController.prototype, "createOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, tsoa_1.Route)('orders')
], OrdersController);
