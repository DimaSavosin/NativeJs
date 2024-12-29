import model from './model.js';

const controller = {
    initialize: function () {
        model.initializeState();

        model.fetchDishes()
            .then(() => {
                model.state.filteredDishes = model.state.dishes;
            })
            .catch(error => console.error("Ошибка при загрузке данных:", error));
    },

    onSelectChange: function (category) {
        if (category === '' || category === 'all') {
            model.state.filteredDishes = model.state.dishes;
        } else {
            model.state.filteredDishes = model.state.dishes.filter(dish => dish.category === category);
        }
    },

    addToCart: function (dish) {
        const existingDish = model.state.cart.find(item => item.id === dish.id);
        if (existingDish) {
            existingDish.quantity += 1;
        } else {
            model.state.cart.push({ ...dish, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(model.state.cart));
    },

    updateCartItem: function (id, change) {
        const dishIndex = model.state.cart.findIndex(item => item.id === id);
        if (dishIndex > -1) {
            model.state.cart[dishIndex].quantity += change;
            if (model.state.cart[dishIndex].quantity <= 0) {
                model.state.cart.splice(dishIndex, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(model.state.cart));
    },

    clearCart: function () {
        model.state.cart = [];
        localStorage.setItem('cart', JSON.stringify(model.state.cart));
    },

    completeOrder: function () {
        const order = {
            id: Date.now(),
            items: [...model.state.cart],
            totalPrice: model.state.cart.reduce((acc, dish) => acc + dish.price * dish.quantity, 0)
        };
        model.state.orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(model.state.orderHistory));
        this.clearCart();
    },

    clearOrderHistory: function () {
        model.state.orderHistory = [];
        localStorage.setItem('orderHistory', JSON.stringify(model.state.orderHistory));
    }
};

export default controller;
