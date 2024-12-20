
const model = {
    state: {
        dishes: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [],
        filteredDishes: []
    },


    fetchDishes: async function () {
        try {
            const response = await fetch('http://localhost:8080/dishes');
            const data = await response.json();
            this.state.dishes = data;
            this.state.filteredDishes = data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    },


    filterDishes: function (category) {
        if (category === '' || category === 'all') {
            this.state.filteredDishes = this.state.dishes;
        } else {
            this.state.filteredDishes = this.state.dishes.filter(dish => dish.category === category);
        }
    },


    addToCart: function (dish) {
        const existingDish = this.state.cart.find(item => item.id === dish.id);
        if (existingDish) {
            existingDish.quantity += 1;
        } else {
            this.state.cart.push({ ...dish, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },


    updateCartItem: function (id, change) {
        const dishIndex = this.state.cart.findIndex(item => item.id === id);
        if (dishIndex > -1) {
            this.state.cart[dishIndex].quantity += change;
            if (this.state.cart[dishIndex].quantity <= 0) {
                this.state.cart.splice(dishIndex, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },


    clearCart: function () {
        this.state.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },


    addOrderToHistory: function (order) {
        this.state.orderHistory.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(this.state.orderHistory));
    }
};

export default model;
