(async() => {
    const reponse = await fetch('http://localhost:5678/api/works')
    const gallery = await reponse.json()
    const reponse2 = await fetch('http://localhost:5678/api/categories')
    const cat = await reponse2.json()
    const jeton = window.sessionStorage.getItem('token')
    console.log(cat)

//création de variable globale
    let fig = null
    let image = null

// Récuperation des éléments du DOM
    const gall = document.querySelector(".gallery")
    const gallerie = document.querySelector('.gallerie')
    const filtres = document.querySelector(".filtres")
    const reveal = document.querySelectorAll('.hide')
    const modal1 = document.getElementById('modal1')
    const modal2 = document.getElementById('modal2')
    const openModal1 = document.querySelectorAll('.js-modal')
    const openModal2 = document.querySelector('.js-modal2')
    const closeModal = document.querySelectorAll('.js-modal-close')
    const listeCategories = document.getElementById('categories')

// Création d'élément du DOM
 // création des éléments de filtres
    const btnFiltres = document.createElement("div")
    btnFiltres.classList.add("filters", "flex-center")
    filtres.appendChild(btnFiltres)
    console.log(btnFiltres)

// Création liste des catégories pour la modal 2
    for(c = 0; c<cat.length; c++){
        const option = document.createElement("option")
        option.id = cat[c].id
        option.setAttribute('value', cat[c].name)
        option.innerText = cat[c].name
        listeCategories.appendChild(option)
    }
    listeCategories.selectedIndex = -1

// Création de fonctions 
// Fonction de génération de la gallerie d'image depuis l'API
    function genererGallerie(gallery, parent){
        for(picture = 0; picture < gallery.length; picture++){
            fig = document.createElement("figure")
            parent.appendChild(fig)
            image = document.createElement("img")
            image.src = gallery[picture].imageUrl
            image.alt = gallery[picture].title
            fig.appendChild(image)
            if(parent.id === 'gallery-projets') {
                const name = document.createElement("figcaption")
                name.innerText = gallery[picture].title
                fig.appendChild(name) 
            }
            else {
                const suppression = document.createElement('button')
                suppression.classList.add('delete', 'flex-center')
                suppression.id = gallery[picture].id
                suppression.innerHTML = `<i class="fa-solid fa-trash-can fa-xs" style="color: #fafafa;"></i>`
                fig.appendChild(suppression)
            }

        }
    }

//Création de fonction d'ouverture des modals
    function open(modal) {
        modal.style.display = null
        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-modal', 'true')
    }

//Création de fonction de fermetures des modals
    function close(modal) {
        modal.style.display = 'none'
        modal.setAttribute('aria-hidden', 'true')
        modal.removeAttribute('aria-modal')
    }

// appel de la fonction pour generer la gallerie d'image avec les titres dans la section portfolio
    genererGallerie(gallery, gall)

// appel de la fonction pour generer la gallerie dans la modal avec les boutons de suppresion
    genererGallerie(gallery, gallerie)

// Création de la suppresion des images de la gallerie via la modal1
    const btnDelete = document.querySelectorAll('.delete')
    for(buttons = 0; buttons<btnDelete.length; buttons++) {
        const id = btnDelete[buttons].id
        btnDelete[buttons].addEventListener('click', async() => {
            const reponse3 = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + jeton 
                }
            })
            closeModal(modal1)
            genererGallerie(gallery, gall)
        })
    }

// Appel des fonctions de'ouvertures et de fermetures des modals
    openModal1.forEach(clique => {
        clique.addEventListener('click', (event)=>{
            event.preventDefault()
            close(modal2)
            open(modal1)
        })
    })

    openModal2.addEventListener('click', (event) => {
        event.preventDefault()
        close(modal1)
        open(modal2)
    })

    closeModal.forEach(clique => {
        clique.addEventListener('click', (event) => {
            event.preventDefault()
            close(modal1)
            close(modal2)
        })
    })

// création des filtres
    const categories = ['Tous']
    for(elementCategorie = 0; elementCategorie < gallery.length; elementCategorie++){
        const categorie = gallery[elementCategorie].category.name
        categories.push(categorie)
    }
    const filters = [...new Set(categories)]

// création des boutons de filtres
    for(filter = 0; filter < filters.length; filter++){
        const buttons = document.createElement("button")
        buttons.innerText = filters[filter]
        buttons.id = filters[filter]
        buttons.classList.add("btn")
        btnFiltres.appendChild(buttons)
    }
    const btns = document.querySelectorAll('.btn')

// mise en place du filtrage dynamique de la page au clique sur les différentes catégories
    for(b = 0; b < btns.length; b++){
        const idBtn = btns[b].id
        if(idBtn != 'Tous'){
            btns[b].addEventListener('click', () => {
                const filteredGallery = gallery.filter(obj => obj.category.name == idBtn)
                document.querySelector(".gallery").innerHTML = ''
                genererGallerie(filteredGallery, gall)
            })
        }
        else {
            btns[b].addEventListener('click', () => {
                document.querySelector(".gallery").innerHTML = ''
                genererGallerie(gallery, gall)
            })   
        }
    }

// Après la connexion d'un utilisateur
    if (jeton !== null ){
        filtres.setAttribute('hidden', '')
        reveal.forEach((element) => {
            element.removeAttribute('hidden')
        })
    }
})()