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
exports.ItemsController = void 0;
const tsoa_1 = require("tsoa");
const itemSchema_1 = require("../models/itemSchema");
let ItemsController = class ItemsController {
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield itemSchema_1.ItemModel.find();
            if (!documents) {
                throw new Error('No products found');
            }
            const items = documents.map(doc => ({
                _id: doc._id.toString(),
                name: doc.name,
                description: doc.description,
                price: doc.price,
                image: doc.image
            }));
            return items;
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield itemSchema_1.ItemModel.findById(id);
            if (!document) {
                throw new Error('No product found');
            }
            const item = {
                _id: document._id.toString(),
                name: document.name,
                description: document.description,
                price: document.price,
                image: document.image
            };
            return item;
        });
    }
    addProduct(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new itemSchema_1.ItemModel(newItem);
            try {
                yield item.save();
            }
            catch (error) {
                console.error(error);
                throw new Error('Error saving item');
            }
        });
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, tsoa_1.Get)()
], ItemsController.prototype, "getProducts", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)())
], ItemsController.prototype, "getProduct", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], ItemsController.prototype, "addProduct", null);
exports.ItemsController = ItemsController = __decorate([
    (0, tsoa_1.Route)('items')
], ItemsController);
