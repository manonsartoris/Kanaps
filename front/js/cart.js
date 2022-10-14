const cart = JSON.parse(localStorage.getItem('cart'));


if (cart !== null){


    for(let i = 0; i < cart.length; i++) {
        fetch('http://localhost:3000/api/products/' + cart[i].id)
        .then(response => {
            
            return response.json();
          
        })
        .then(kanap => {

            const color = cart[i].color;
            const quantity = cart[i].quantity;
            renderProduct(kanap, color, quantity);
           

        })
    }
}


function renderProduct(kanap, color, quantity){

    // SECTION
    const sectionKanap = document.getElementById('cart__items');

        // ARTICLE
        const articleKanap = document.createElement('article');
        articleKanap.classList.add('cart__item');
        articleKanap.setAttribute('data-id', '{product-ID}');
        articleKanap.setAttribute('data-color', '{product-color}');
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
                        inputKanap.setAttribute('value', quantity);
                        divQuantityKanap.appendChild(inputKanap);

                    // DETAIL DELETE
                    const divDeleteKanap = document.createElement('div');
                    divDeleteKanap.classList.add('cart__item__content__settings__delete');
                    divQuantitiesKanap.appendChild(divDeleteKanap);

                        // DETELE
                        const pDeleteKanap = document.createElement('p');
                        pDeleteKanap.classList.add('deleteItem');
                        pDeleteKanap.innerText = 'Supprimer';
                        divDeleteKanap.appendChild(pDeleteKanap)

                      

    // QUANTITE TOTAL
    /* addition de chaque quantité */


    // PRIX TOTAL

    // ERROR 




}

/*function totalQuantity (){
    const totalQuantity = document.getElementById('totalQuantity');
    const sum = 0
    cart = JSON.parse(cart);

    for (let i = 0 ; i < cart.length ; i++){
        if (cart[i].quantity !== 0){
            cart[i].quantity += parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));

        }
    }
}*/