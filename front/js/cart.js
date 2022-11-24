const cart = JSON.parse(localStorage.getItem('cart'));


if (cart !== null){

    var productIds = []
    for(let i =0; i< cart.length ; i++){
        if(!productIds.includes(cart[i].id)){
            productIds.push(cart[i].id)
        }
    }

    var promises = []
    for(let i = 0; i < productIds.length; i++) {
        promises.push( fetch('http://localhost:3000/api/products/' + productIds[i])
        .then(response => {
            
            return response.json();
            
        }))
    }

    Promise.all(promises).then(kanaps => {
        let dataPrice = {'quantity':0, 'totalPrice':0};
        for(let i = 0; i < cart.length; i++){
            for( let j =0 ; j < kanaps.length; j++){
                if (kanaps[j]._id == cart[i].id){
                    var kanap = kanaps[j]
                }
            }

            const color = cart[i].color;
            const quantity = cart[i].quantity;
            renderProduct(kanap, color, quantity);
        } 
        renderTotal()
    })

}

// ------  AFFICHAGE DES PRODUITS DANS LE PANIER  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function renderProduct(kanap, color, quantity){

    // SECTION
    const sectionKanap = document.getElementById('cart__items');

    // ARTICLE
    const articleKanap = document.createElement('article');
    articleKanap.classList.add('cart__item');
    articleKanap.setAttribute('data-id', kanap._id);
    articleKanap.setAttribute('data-color', color);
    sectionKanap.appendChild(articleKanap);

    // DIV IMAGE
    const divImgKanap = document.createElement('div');
    divImgKanap.classList.add('cart__item__img')
    articleKanap.appendChild(divImgKanap);

    // IMAGE
    const imgKanap = document.createElement('img');
    imgKanap.src = kanap.imageUrl;
    imgKanap.alt = kanap.altTxt;
    divImgKanap.appendChild(imgKanap);

    // DETAIL PRODUIT
    const divDetailKanap = document.createElement('div');
    divDetailKanap.classList.add('cart__item__content');
    articleKanap.appendChild(divDetailKanap);

    // DESCRIPTION
    const divDescriptionKanap = document.createElement('div');
    divDescriptionKanap.classList.add('cart__item__content__description');
    divDetailKanap.appendChild(divDescriptionKanap);

    // TITRE
    const titleKanap = document.createElement('h2')
    titleKanap.innerText = kanap.name;
    divDescriptionKanap.appendChild(titleKanap);

    // COULEUR
    const colorKanap = document.createElement('p');
    colorKanap.innerText = color;
    divDescriptionKanap.appendChild(colorKanap);

    // PRIX
    const priceKanap = document.createElement('p')
    priceKanap.innerText = kanap.price + ' €';
    divDescriptionKanap.appendChild(priceKanap);
    
    // DETAIL QUANTITE
    const divQuantitiesKanap = document.createElement('div');
    divQuantitiesKanap.classList.add('cart__item__content__settings');
    divDetailKanap.appendChild(divQuantitiesKanap);

    // QUANTITE
    const divQuantityKanap = document.createElement('div');
    divQuantityKanap.classList.add('cart__item__content__settings__quantity');
    divQuantitiesKanap.appendChild(divQuantityKanap);

    // Qté :
    const pQty = document.createElement('p');
    pQty.innerText = 'Qté : ';
    divQuantityKanap.appendChild(pQty);

    // Input
    const inputKanap = document.createElement('input');
    inputKanap.setAttribute('type','number');
    inputKanap.setAttribute('class','itemQuantity');
    inputKanap.setAttribute('name','itemQuantity');
    inputKanap.setAttribute('min','1');
    inputKanap.setAttribute('max','100');
    inputKanap.dataset.id = kanap._id;
    inputKanap.dataset.color = color;  
    inputKanap.setAttribute('value', quantity);

    inputKanap.addEventListener('change', element => {
        const moveQte = inputKanap.value
        moveQuantity(element.target.dataset.id, element.target.dataset.color, moveQte);
        renderTotal()
    });

    divQuantityKanap.appendChild(inputKanap);

    // DETAIL DELETE
    const divDeleteKanap = document.createElement('div');
    divDeleteKanap.classList.add('cart__item__content__settings__delete');
    divQuantitiesKanap.appendChild(divDeleteKanap);

    // DETELE
    const pDeleteKanap = document.createElement('p');
    pDeleteKanap.classList.add('deleteItem');
    pDeleteKanap.dataset.id = kanap._id;
    pDeleteKanap.dataset.color = color;    
    pDeleteKanap.innerText = 'Supprimer';

    // Dans LocalStorage : suppression de l'article sélectionné    PAUSE //
    pDeleteKanap.addEventListener('click', element => {
        deleteItem(element.target.dataset.id, element.target.dataset.color);
        renderTotal()
        element.target.closest('article').remove()
    });

    divDeleteKanap.appendChild(pDeleteKanap);

}

// ------  AFFICHAGE DU PRIX ET DE LA QUANTITÉ TOTALE  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

async function renderTotal(){

    var cart = localStorage.getItem('cart')
    var totalPrice = 0;
    var totalQuantity = 0;
    if(cart != null){
        cart = JSON.parse(cart)
        for(let i = 0; i < cart.length; i++){
            let product = await fetch('http://localhost:3000/api/products/' + cart[i].id)
            .then(response => {
            
                return response.json();
                
            })
            totalPrice += parseInt(cart[i].quantity) * parseInt(product.price)
            totalQuantity += parseInt(cart[i].quantity)
    
        }
    }

    let totalQuantityElement = document.getElementById('totalQuantity');
    totalQuantityElement.innerText = totalQuantity;

    let totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = totalPrice;

}

// ------  SUPPRIMER ARTICLE DU PANIER  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function deleteItem(deleteId, deleteColor){

    const articlePanier = JSON.parse(localStorage.getItem('cart'))

    for(let i = 0 ; i < articlePanier.length; i++){
        if (deleteId == articlePanier[i].id && deleteColor == articlePanier[i].color){

            cart.splice(i, 1)
            localStorage.setItem('cart', JSON.stringify(cart));

        }
    }

}


// ------  MODIFICATION DE LA QUANTITÉ  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function moveQuantity(moveId, moveColor, moveQte){

    const articlePanier = JSON.parse(localStorage.getItem('cart'))

    for(let i = 0 ; i < articlePanier.length; i++){
        if (moveId == articlePanier[i].id && moveColor == articlePanier[i].color){

            cart[i].quantity = Number(moveQte)
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

}

// ------  FORMULAIRE  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function form(){
    const stringValid = /[A-z]{3}/
    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const firstName = document.getElementById('firstName').value
    const firstNameError = document.getElementById('firstNameErrorMsg')

    const lastName = document.getElementById('lastName').value
    const lastNameError = document.getElementById('lastNameErrorMsg')
    
    const address = document.getElementById('address').value
    const addressError = document.getElementById('addressErrorMsg')
 
    const city = document.getElementById('city').value
    const cityError = document.getElementById('cityErrorMsg')

    const valueValid = [firstName,  lastName , address , city]
    const error = [firstNameError, lastNameError, addressError, cityError]

    for (let i = 0 ; i < valueValid.length;  i++){
        for (let j = 0 ; j < error.length; j++){
            if(stringValid.test(valueValid[i])){
               error[i].innerText = ''
            } else {
               error[i].innerText = 'Renseignez plus de 2 caractères'
            }
        }
    }

    const email = document.getElementById('email').value
    const emailError = document.getElementById('emailErrorMsg')

    if(emailValid.test(email)){
        emailError.innerText = ''
    } else {
        emailError.innerText = 'Veuillez renseigné une adresse mail valide'
    }

   /* Formulaire avec données valides */

    if(emailValid.test(email)){
        for (let j = 0 ; j < valueValid.length; j++){
            if(stringValid.test(valueValid[i])){
                isValid = true
            } else {
                isValid = false
            }
        }
    } else {
        isValid = false
    }

    /* Données de contact du formulaire */


    data = {
        contact: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email
        },
        products: [productIds]
    }

console.log(data)

    


}    
    async function orderId(){
        let response = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        alert(response);
    }
// ------  COMMANDER  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    const submitOrder = document.getElementById('order')
    submitOrder.addEventListener('click', event => {
        event.preventDefault()
            form()
            orderId()
        
        //envoie dans la page confirmation

    })

