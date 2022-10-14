fetch("http://localhost:3000/api/products").then(response => {
    response.json().then(kanaps => {
        kanaps.forEach(kanap => {
            
            // SECTION
            const itemKanap = document.getElementById("items");

                // ID
                const aKanap = document.createElement("a");
                aKanap.href = './product.html?id=' + kanap._id;
                itemKanap.appendChild(aKanap);

                    // ARTICLE
                    const articleKanap = document.createElement("article");
                    aKanap.appendChild(articleKanap);

                        // IMAGE
                        const imgKanap = document.createElement("img");
                        imgKanap.src = kanap.imageUrl;
                        imgKanap.alt = kanap.altTxt;
                        articleKanap.appendChild(imgKanap);

                        // NOM
                        const h3Kanap = document.createElement("h3");
                        h3Kanap.innerText = kanap.name;
                        h3Kanap.classList.add("productName");
                        articleKanap.appendChild(h3Kanap);

                        // DESCRIPTION
                        const pKanap = document.createElement("p");
                        pKanap.classList.add("productDescription");
                        pKanap.innerText = kanap.description;
                        articleKanap.appendChild(pKanap);

        })
    })
})
