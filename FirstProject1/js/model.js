const model = {
    state: {
        dishes: [],
        cart: [],
        orderHistory: [],
        filteredDishes: []
    },

    async fetchDishes() {
        try {
            const response = await fetch('http://localhost:8080/dishes');
            const data = await response.json();
            this.state.dishes = data;
            this.state.filteredDishes = data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    },


    initializeState() {
        this.state.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.state.orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    }
};

export default model;
