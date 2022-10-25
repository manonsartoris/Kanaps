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
    })
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
                        pDeleteKanap.dataset.id = kanap._id;
                        pDeleteKanap.dataset.color = color;
                        pDeleteKanap.innerText = 'Supprimer';

                        // Dans LocalStorage : suppression de l'article sélectionné    PAUSE //
                        pDeleteKanap.addEventListener('click', element => {

                            function deleteItemSelect(element, cart) {
 
                                cart.splice(element, 1);
                                localStorage.setItem('cart', JSON.stringify(cart));
                            
                            }
                            deleteItemSelect(element, cart);
                        });

                        divDeleteKanap.appendChild(pDeleteKanap)



                            // Prix total 
                               // Prix total 
                        
                               let totalPrice = document.getElementById('totalPrice');
                            
                               const total = [kanap.price * quantity];
        
                               console.log(total);
        
        
                               totalPrice.innerText = total;

                            
                            // je reuni tout les prix dans un tableau

                            // j'effectue la somme de chaque resultat
                            // j'affiffe dans totalPrice le resultat
                            

                            console.log(total);


                            totalPrice.innerText = total;
                   


                            // Quantité total

                            let totalQuantity = document.getElementById('totalQuantity');

                            let totalQte = quantity;

                            totalQuantity.innerText = totalQte;

                        
}
                    

                                                






/* ajout quantité

si la quantité est modifier, 
alors on remplace la quantité par la nouvelle valeur

*/



