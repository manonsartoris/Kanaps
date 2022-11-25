const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let id = params.id; 


fetch("http://localhost:3000/api/products/" + id).then(response => {
    response.json().then(kanap => {
            // IMAGE
            const imageKanap = document.querySelector(".item__img");

            const imgKanap = document.createElement("img");
            imgKanap.src = kanap.imageUrl;
            imgKanap.alt = kanap.altTxt;

            imageKanap.appendChild(imgKanap)

            // TITRE
            const titleKanap = document.getElementById("title");
            titleKanap.innerText = kanap.name;

            // PRIX
            const prixKanap = document.getElementById("price");
            prixKanap.innerText = kanap.price;

            // DESCRIPTION
            const descriptionKanap = document.getElementById("description");
            descriptionKanap.innerText = kanap.description;

            // COULEUR
            const colorsKanap = document.getElementById("colors");
                for(let color of kanap.colors){
                    const optionKanap = document.createElement("option");
                    optionKanap.value = color;
                    optionKanap.innerText = color;
                    colorsKanap.appendChild(optionKanap)
                }
        })
    })

/* Au clic sur le bouton */

let addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', event => {

    let cart = localStorage.getItem('cart')

    let color = document.getElementById('colors').value;

    let quantity = document.getElementById('quantity').value;

    // Detail du panier

    let data = {
        id : id,
        color : color,
        quantity : Number(quantity)
    }

    // Si la quantité = 0
    if (data.quantity !== 0 && data.color !== '' && data.quantity <= 100){
      if (cart === null){
        console.log(data.color)
        // Si le panier est vide

        let cart = [];
        cart.push(data);
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {

        // Si le panier contient un article de même id et de même couleur

        cart = JSON.parse(cart);
        let founded = false
        for(let i = 0; i < cart.length; i++){
            if(id == cart[i].id && color == cart[i].color){
                founded = true;
                cart[i].quantity += parseInt(quantity);
            }
        }

        // Si le panier contient des articles différents

        if(founded == false){
            cart.push(data);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    }} else {
        if (data.quantity === 0 && data.color === ''){
            alert("Veuillez choisir la couleur et la quantité du produit")
        } else if (data.color === ''){
            alert("Veuillez choisir la couleur du produit")
        } else if (data.quantity === 0){
            alert("Veuillez choisir la quantité du produit")
        } else if (data.quantity >= 100){
            alert("Veuillez choisir une quantité compris entre 1 et 100")
        }
 };
})
 

