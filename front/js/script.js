fetch("http://localhost:3000/api/products").then(response => {
    response.json().then(kanaps => {
    html = '' ;


     kanaps.forEach(kanap => {
     html += '<a href="./product.html?id=' + kanap._id + '"><article><img src="' + kanap.imageUrl + '" alt="image.kanap"></img><h3 class="productName">' + kanap.name + '</h3><p class="productDescription">' + kanap.description + '</p></article></a>'
    })
    document.getElementById('items').innerHTML = html
    } )})

