"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("../app/store"));
function MyApp({ Component, pageProps }) {
    return (<react_redux_1.Provider store={store_1.default}>
      <Component {...pageProps}/>
    </react_redux_1.Provider>);
}
exports.default = MyApp;
