(async() => {
    const reponse = await fetch('http://localhost:5678/api/works')
    const gallery = await reponse.json()
    const pf = document.getElementById("portfolio")
    const gall = document.querySelector(".gallery")

    const filtres = document.createElement("div")
    filtres.classList.add("filtres")
    pf.insertBefore(filtres, gall)
    fil = document.querySelector(".filtres")

// création d'un tableau pour stocker le noms des catégories avec la catégorie globale, puis boucle pour récupérer les catégories dans le tableur avec élimination des doublons
    const categories = ['Tous']
    for(elementCategorie = 0; elementCategorie < gallery.length; elementCategorie++){
        const categorie = gallery[elementCategorie].category.name
        categories.push(categorie)
    }
    const filters = [...new Set(categories)]

// création de la boucle sur les catégories pour créer les boutons de filtres
    for(filter = 0; filter < filters.length; filter++){
        const buttons = document.createElement("button")
        buttons.innerText = filters[filter]
        buttons.id = filters[filter]
        buttons.classList.add("btn")
        fil.appendChild(buttons)
    }
    const btns = document.querySelectorAll('.btn')

    function genererImages (gallery) {
        for(picture = 0; picture < gallery.length; picture++) {
            const fig = document.createElement("figure")
            gall.appendChild(fig)
            const image = document.createElement("img")
            image.src = gallery[picture].imageUrl
            image.alt = gallery[picture].title
            fig.appendChild(image)
            const name = document.createElement("figcaption")
            name.innerText = gallery[picture].title
            fig.appendChild(name) 
        }
    }
    genererImages(gallery)

    for(b = 0; b < btns.length; b++){
        const idBtn = btns[b].id
        if(idBtn != 'Tous'){
            btns[b].addEventListener('click', () => {
                const filteredGallery = gallery.filter(obj => obj.category.name == idBtn)
                document.querySelector(".gallery").innerHTML = ''
                genererImages(filteredGallery)
            })
        }
        else {
            btns[b].addEventListener('click', () => {
                document.querySelector(".gallery").innerHTML = ''
                genererImages(gallery)
            })   
        }
    }

    const jeton = window.sessionStorage.getItem('token')
    console.log(jeton)

    if (jeton !== null ){
        const body = document.querySelector('body')
        const header = document.querySelector('header')
        console.log(header)
        const edition = document.createElement('div')
        edition.classList.add('edition')
        const lien = document.createElement('a')
        lien.innerText = 'Mode Édition'
        edition.appendChild(lien)
        body.insertBefore(edition, header)
        const link = document.querySelector('a')
        link.setAttribute('href', '#modal')
        console.log(link)

        const gallerie = document.querySelector('.gallerie')
        for(picture = 0; picture < gallery.length; picture++) {
            const image = document.createElement("img")
            image.src = gallery[picture].imageUrl
            image.alt = gallery[picture].title
            gallerie.appendChild(image)
        }
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const target = document.querySelector(event.target.getAttribute('href'))
            target.style.display = null
        })
    }
})()