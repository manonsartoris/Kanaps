// Dans LocalStorage : suppression de l'article sélectionné //
function deleteItemSelect(element, cart) {
    let index = element.target.classList[1];
    
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
 
}

pDeleteKanap.addEventListener('click', element => {
    deleteItemSelect(element, cart);
});

// Calcul du total prix//
function showTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

                       // Prix total 
                        
                       let totalPrice = document.getElementById('totalPrice');
                            
                       const total = [kanap.price * quantity];

                       console.log(total);


                       totalPrice.innerText = total;
                   
                   // Quantité total

                       let totalQuantity = document.getElementById('totalQuantity');

                       let totalQte = quantity;
                       console.log(totalQte);

                       totalQuantity.innerText = totalQte;