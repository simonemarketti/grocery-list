// DOM

// Query
const addForm = document.querySelector('.add-form');
const search = document.querySelector('.search input');
const productsList = document.querySelector('.products-list');

// FUNCTIONS

// Create function to add product
const refreshList = product => {
    const newProduct = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${product}</span>
      <i class="fas fa-cart-arrow-down delete"></i>
    </li>
  `;
    // create products counter
    let counter = productsList.childElementCount + 1;
    // and max products logic
    if (counter < 8) {
        productsList.innerHTML += newProduct;
    } else {
        productsList.innerHTML += newProduct;
        addForm.add.setAttribute('disabled', '');
    }
}

// Create function to search products
const filterProducts = word => {
    // add filtered class
    Array.from(productsList.children)
        .filter(product => !product.textContent.toLowerCase().includes(word))
        .forEach(product => product.classList.add('filtered'));

    // remove filtered class
    Array.from(productsList.children)
        .filter(product => product.textContent.toLowerCase().includes(word))
        .forEach(product => product.classList.remove('filtered'));
};

// EVENTS

// Add products event
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const product = addForm.add.value.trim();
    if (product.length) {
        refreshList(product);
        addForm.reset();
    }
});

// Delete products event (applied to the father "ul" using delegation)
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
    addForm.add.removeAttribute('disabled');
});

// Filter products event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterProducts(term);
});
