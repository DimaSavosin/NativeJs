import { watch } from '../helper/watch.js';

const view = {
    initialize: function (controller, state) {
        this.controller = controller;
        this.state = state;

        this.setListeners();
        this.setWatchers();
    },

    setListeners() {
        document.querySelector(".nav__filter-select").addEventListener("change", (event) => {
            this.controller.onSelectChange(event.target.value);
        });

        document.querySelector(".nav__button--cart").addEventListener("click", () => {
            this.openModal("cart-modal");
        });

        document.querySelector(".nav__button--history").addEventListener("click", () => {
            this.openModal("history-modal");
        });

        document.querySelectorAll(".main__modal__content-close").forEach(button => {
            button.addEventListener("click", () => {
                this.closeModal();
            });
        });
    },
    setWatchers() {
        watch(this.state, 'filteredDishes', () => {
            this.renderMenu();
        });

        watch(this.state, 'cart', () => {
            this.renderCart();
        });

        watch(this.state, 'orderHistory', () => {
            this.renderOrderHistory();
        });
    },



    createElement(tag, classes, textContent = "", attributes = {}) {
        const element = document.createElement(tag);
        if (classes) element.className = classes;
        if (textContent) element.textContent = textContent;
        for (const attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    },

    renderMenu() {
        const section = document.querySelector(".main__dishes");
        const menuData = this.state.filteredDishes;

        section.innerHTML = '';

        if (menuData.length === 0) {
            section.innerHTML = '<p>Нет блюд для отображения</p>';
        } else {
            menuData.forEach(dish => {
                const dishElement = this.createElement("div", "main__dishes-dish");

                const img = this.createElement("img", "main__dishes-img", "", { src: dish.image, alt: dish.name });
                const h3 = this.createElement("h3", "main__dishes-title", dish.name);
                const paragraph = this.createElement("p", "main__dishes-paragraph", dish.description);
                const price = this.createElement("p", "main__dishes-price", `Цена: ${dish.price} ₽`);
                const button = this.createElement("button", "main__dishes-button", "Добавить в корзину");
                button.addEventListener("click", () => this.controller.addToCart(dish));

                dishElement.append(img, h3, paragraph, price, button);
                section.appendChild(dishElement);
            });
        }
    },

    renderCart() {
        const cart = this.state.cart;
        const cartModalContent = document.querySelector("#cart-modal .main__modal__items");
        cartModalContent.innerHTML = "";

        if (cart.length === 0) {
            cartModalContent.innerHTML = "<h3 class='main__modal__items--empty'>Ваша корзина пуста</h3>";
        } else {
            cart.forEach(dish => {
                const dishElement = this.createElement("div", "main__modal__items-dish");

                const img = this.createElement("img", "main__modal__items-dish-img", "", { src: dish.image, alt: dish.name });
                const h3 = this.createElement("h3", "main__modal__items-dish-title", dish.name);
                const quantity = this.createElement("p", "main__modal__items-dish-quantity", `Количество: ${dish.quantity}`);
                const price = this.createElement("p", "main__modal__items-dish-price", `Цена: ${dish.price * dish.quantity} ₽`);

                const buttons = this.createElement("div", "main__modal__items-dish-buttons");
                const plusButton = this.createButton("+", "main__modal__items-dish-button main__modal__items-dish-button--plus", () => this.controller.updateCartItem(dish.id, 1));
                const minusButton = this.createButton("-", "main__modal__items-dish-button main__modal__items-dish-button--minus", () => this.controller.updateCartItem(dish.id, -1));
                buttons.append(minusButton, plusButton);

                dishElement.append(img, h3, quantity, price, buttons);
                cartModalContent.appendChild(dishElement);
            });

            cartModalContent.append(
                this.createButton("Очистить корзину", "main__modal__button--clear", () => this.controller.clearCart()),
                this.createButton("Оплатить", "main__modal__button--pay", () => this.controller.completeOrder())
            );
        }
    },

    renderOrderHistory() {
        const orderHistory = this.state.orderHistory;
        const orderHistoryContainer = document.querySelector("#history-modal .main__modal__items");
        orderHistoryContainer.innerHTML = "";

        if (orderHistory.length === 0) {
            orderHistoryContainer.innerHTML = "<h3 class='main__modal__items--empty'>История заказов пуста</h3>";
        } else {
            orderHistory.forEach(order => {
                const orderElement = this.createElement("div", "main__modal__items-history__item");

                const orderTitle = this.createElement("h4", "main__modal__items-history__title", `Заказ №${order.id}`);
                const orderDetails = this.createElement("p", "main__modal__items-history__goods", `Товары: ${order.items.map(item => item.name).join(", ")}`);
                const orderPrice = this.createElement("p", "main__modal__items-history__price", `Сумма: ${order.totalPrice} ₽`);

                orderElement.append(orderTitle, orderDetails, orderPrice);
                orderHistoryContainer.appendChild(orderElement);
            });

            orderHistoryContainer.appendChild(
                this.createButton("Очистить историю", "main__modal__button--clear-history", () => this.controller.clearOrderHistory())
            );
        }
    },

    createButton(text, classes, onClick) {
        const button = this.createElement("button", classes, text);
        button.addEventListener("click", onClick);
        return button;
    },

    closeModal: function () {
        document.querySelectorAll(".main__modal").forEach(modal => {
            modal.style.display = "none";
        });
    },
    openModal: function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    },
};

export default view;
