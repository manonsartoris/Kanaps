function confirmation(){

    const params = window.location.href;
    const url = new URL(params);
    const orderId = url.searchParams.get('orderId')

    const commande = document.getElementById('orderId');

    commande.innerText = orderId

}

confirmation()