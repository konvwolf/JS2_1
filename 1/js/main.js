const image = "https://placeimg.com/200/150/any";
const cartImage = "https://placeimg.com/100/80/any";

const NAMES = ['Tomato', 'Potato', 'Cucumber', 'Cherry', 'Cabbage', 'Watermelon']; //заглушка типа БД
const PRICES = [300, 60, 980, 360, 34, 80]; //заглушка типа БД
const ids = [0, 1, 2, 3, 4, 5];

const PRODUCTS = fetchData(); //заглушка ответа с сервера
const userCart = [];
var cartBlock = document.querySelector('.cart-block');

document.querySelector('.btn-cart').addEventListener('click', () => {
	cartBlock.classList.toggle('invisible');
})

document.querySelector('.products').addEventListener('click', (evt) => {
	if (evt.target.classList.contains('buy-btn')) {
		addProduct(evt.target)
	}
})

document.querySelector('.cart-block').addEventListener('click', (evt) => {
	if (evt.target.classList.contains('del-btn')) {
		removeProduct(evt.target)
	}
})

function fetchData() {
	let arr = [];
	for (let i = 0; i < ids.length; i++) {
		arr.push(createProduct(i))
	}
	return arr
}

function createProduct(i) {
	return {
		id: i,
		name: NAMES[i],
		price: PRICES[i],
		img: image,
		quantity: 0,
		createTemplate: function () {
			return `<div class="product-item" data-id="${this.id}">
						<img src="${this.img}" alt="some image">
						<div class="desc">
							<h3>${this.name}</h3>
							<p>${this.price}</p>
							<button class="buy-btn" 
							data-id="${this.id}"
							data-name="${this.name}"
							data-price="${this.price}">КУПИТЬ</button>
						</div>
					</div>` // отсутствовали кавычки, из-за ломалась верстка и не грузилась картинка, поправил опечатки
		}
	}
}

function renderProducts() {
	let str = ''
	for (let product of PRODUCTS) {
		str += product.createTemplate()
	}
	document.querySelector('.products').innerHTML = str
}

renderProducts()

function addProduct(product) {
	let productID = +product.dataset['id'];
	let find = userCart.find(element => element.id === productID); //element (true) / false

	if (!find) {
		userCart.push({
			id: productID,
			name: product.dataset['name'],
			price: +product.dataset['price'],
			img: cartImage,
			quantity: 1
		})
	} else {
		find.quantity++
	}
	renderCart()
}


function renderCart(i) {
	let allProducts = '';
	let totalPrice = 0;
	for (item of userCart) {
		allProducts += `<div class="cart-item" data-id="${item.id}>
							<div class="product-bio">
								<img src="${item.img}" alt="some image">
								<div class="product-desc">
									<p class="product-title">${item.name}</p>
									<p>
										<span class="product-quantity">${item.quantity}</span> * <span class="product-single-price">${item.price}</span>
									</p>
									<p class="product-total-price">${item.quantity * item.price}</p>
								</div>
								<div class="right-block">
									<button class="del-btn" data-id="${item.id}">&times;</button>
								</div>
							</div>
						</div>`; // добавил подсчет промежуточного итога по каждому продукту в корзине, поправил опечатки
		totalPrice = totalPrice + item.quantity * item.price; // добавил счетчик итого
	}
	let cartTotals =   `<div class="cart-totals">
							<div class="cart-total-sign">Your totals:</div>
							<div class="cart-total-price">${totalPrice}</div>
						</div>`; // блок итого
	cartBlock.innerHTML = allProducts + cartTotals;
}


function removeProduct(product) {
	let productID = +product.dataset['id'];
	let find = userCart.find(element => element.id === productID);

	if (find.quantity > 1) {
		find.quantity--
	} else {
		userCart.splice(userCart.indexOf(find), 1)
		document.querySelector(`.cart-item[data-id="${productID}"]`)
	}
	renderCart()
}