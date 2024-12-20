import controller from './controller.js';
import { watchState } from '../helper/watch.js';
import model from './model.js';
import view from "./view.js";

const initializeApp = () => {

    watchState();


    model.state.cart = JSON.parse(localStorage.getItem('cart')) || [];
    model.state.orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];


    controller.initialize();


    view.initialize(controller, model.state);
};


initializeApp();
