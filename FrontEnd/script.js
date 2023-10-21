(async() => {
    const reponse = await fetch('http://localhost:5678/api/works')
    const gallery = await reponse.json()
    console.log(gallery)

    const pf = document.getElementById("portfolio")

    document.getElementById("portfolio").innerHTML = ''
    const projets = document.createElement("h2")
    projets.innerText = 'Mes projets'
    pf.appendChild(projets)

    const filtres = document.createElement("div")
    filtres.classList.add("filtres")
    pf.appendChild(filtres)
    fil = document.querySelector(".filtres")

    const gall = document.createElement("div")
    gall.classList.add("gallery")
    pf.appendChild(gall)


// création d'un tableau pour stocker le noms des catégories avec la catégorie globale, puis boucle pour récupérer les catégories dans le tableur avec élimination des doublons
    const categories = ['Tous']
    
    for(elementCategorie = 0; elementCategorie < gallery.length; elementCategorie++){
        const categorie = gallery[elementCategorie].category.name
        categories.push(categorie)
    }

    const filters = [...new Set(categories)]
    console.log(filters)

// création de la boucle sur les catégoris pour créer les boutons de filtres
    for(filter = 0; filter < filters.length; filter++){
        const buttons = document.createElement("button")
        buttons.innerText = filters[filter]
        buttons.id = filters[filter]
        buttons.classList.add("btn")
        fil.appendChild(buttons)
    }


    const noms = gallery.map(img => img.title)
    const url = gallery.map(img => img.imageUrl)
// boucle pour la récupération des photos et des titres afin de les afficher sur la page web

    for( i = 0;  i< noms.length; i++){
        const fig = document.createElement("figure")
        gall.appendChild(fig)
        const image = document.createElement("img")
        image.src = url[i]
        image.alt = noms[i]
        fig.appendChild(image)
        const name = document.createElement("figcaption")
        name.innerText = noms[i]
        fig.appendChild(name)
    }

    

    const btnAll = document.getElementById('Tous')
    const btnObj = document.getElementById('Objets')
    const btnApt = document.getElementById('Appartements')
    const btnHoRes = document.getElementById('Hotels & restaurants')

    btnObj.addEventListener('click', function(){
        const noms = gallery.map(img => img.title)
        const url = gallery.map(img => img.imageUrl)
        for(i = gallery.length-1; i>= 0; i--) {
            if(gallery[i].category.name != "Objets"){
                noms.splice(i,1)
                url.splice(i,1)
            }
        }
        
        document.querySelector(".gallery").innerHTML = ''
        for( i = 0;  i< noms.length; i++){
            const fig = document.createElement("figure")
            gall.appendChild(fig)
            const image = document.createElement("img")
            image.src = url[i]
            image.alt = noms[i]
            fig.appendChild(image)
            const name = document.createElement("figcaption")
            name.innerText = noms[i]
            fig.appendChild(name)
        }
    })
    
    btnApt.addEventListener('click', function(){
        const noms = gallery.map(img => img.title)
        const url = gallery.map(img => img.imageUrl)
        for(i = gallery.length-1; i>= 0; i--) {
            if(gallery[i].category.name != "Appartements"){
                noms.splice(i,1)
                url.splice(i,1)
            }
        }
        
        document.querySelector(".gallery").innerHTML = ''
        for( i = 0;  i< noms.length; i++){
            const fig = document.createElement("figure")
            gall.appendChild(fig)
            const image = document.createElement("img")
            image.src = url[i]
            image.alt = noms[i]
            fig.appendChild(image)
            const name = document.createElement("figcaption")
            name.innerText = noms[i]
            fig.appendChild(name)
        }
    })
    
    btnHoRes.addEventListener('click', function() {
        const noms = gallery.map(img => img.title)
        const url = gallery.map(img => img.imageUrl)
        for(i = gallery.length-1; i>= 0; i--) {
            if(gallery[i].category.name != "Hotels & restaurants"){
                noms.splice(i,1)
                url.splice(i,1)
            }
        }
        
        document.querySelector(".gallery").innerHTML = ''
        for( i = 0;  i< noms.length; i++){
            const fig = document.createElement("figure")
            gall.appendChild(fig)
            const image = document.createElement("img")
            image.src = url[i]
            image.alt = noms[i]
            fig.appendChild(image)
            const name = document.createElement("figcaption")
            name.innerText = noms[i]
            fig.appendChild(name)
        }
    })

    btnAll.addEventListener('click', function(){
        const noms = gallery.map(img => img.title)
        const url = gallery.map(img => img.imageUrl)
        document.querySelector(".gallery").innerHTML = ''
        for( i = 0;  i< noms.length; i++){
            const fig = document.createElement("figure")
            gall.appendChild(fig)
            const image = document.createElement("img")
            image.src = url[i]
            image.alt = noms[i]
            fig.appendChild(image)
            const name = document.createElement("figcaption")
            name.innerText = noms[i]
            fig.appendChild(name)
        }
    })

})()

