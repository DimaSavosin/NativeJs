import model from './model.js';

const controller = {
    initialize: function () {
        model.fetchDishes()
            .then(() => {
                model.state.filteredDishes = model.state.dishes;
            })
            .catch(error => console.error("Ошибка при загрузке данных:", error));
    },

    onSelectChange: function (category) {
        model.filterDishes(category);
    },


    addToCart: function (dish) {
        model.addToCart(dish);
    },

    updateCartItem: function (id, change) {
        model.updateCartItem(id, change);
    },

    clearCart: function () {
        model.clearCart();
    },

    completeOrder: function () {
        const order = {
            id: Date.now(),
            items: [...model.state.cart],
            totalPrice: model.state.cart.reduce((acc, dish) => acc + dish.price * dish.quantity, 0)
        };
        model.addOrderToHistory(order);
        model.clearCart();
    },

    clearOrderHistory: function () {
        model.state.orderHistory = [];
    }
};

export default controller;
