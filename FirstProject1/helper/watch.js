
import WatchJS from './melanke-watchjs.js';
import model from '../js/model.js';
import view from '../js/view.js';

const { watch } = WatchJS;


const watchState = () => {

    watch(model.state, 'cart', () => {
        localStorage.setItem('cart', JSON.stringify(model.state.cart));
        view.renderCart();
    });


    watch(model.state, 'orderHistory', () => {
        localStorage.setItem('orderHistory', JSON.stringify(model.state.orderHistory));
        view.renderOrderHistory();
    });


    watch(model.state, 'filteredDishes', () => {
        view.renderMenu();
    });
};
export { watch, watchState };
