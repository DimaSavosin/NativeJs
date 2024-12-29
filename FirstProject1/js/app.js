import controller from './controller.js';
import { watchState } from '../helper/watch.js';
import model from './model.js';
import view from "./view.js";

const initializeApp = () => {
    watchState();
    controller.initialize();
    view.initialize(controller, model.state);
};

initializeApp();
