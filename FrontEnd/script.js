(async() => {
    const reponse = await fetch('http://localhost:5678/api/works')
    console.log(reponse)
    const gallery = await reponse.json()
    const reponse2 = await fetch('http://localhost:5678/api/categories')
    const cat = await reponse2.json()
    console.log(cat)
    const jeton = window.sessionStorage.getItem('token')
   
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
    const form = document.getElementById('form-modal')
    const file = document.getElementById('file')
    const addPicture = document.querySelector('.add-picture')
    const namePic = document.getElementById('title-picture')
    const option = document.getElementById('categories')
    const btnVal = document.getElementById('validation')

    file.addEventListener('change', () => {
        const pic = file.files[0]
        addPicture.innerHTML = ''
        const miniature = document.createElement('img')
        miniature.classList.add('miniature')
        const reader = new FileReader()
        addPicture.appendChild(miniature)
        reader.addEventListener('load', (event) => {
            miniature.src = event.target.result
        })
        reader.readAsDataURL(pic)
        
    })
    
// Création d'élément du DOM
 // création des éléments de filtres
    const btnFiltres = document.createElement("div")
    btnFiltres.classList.add("filters", "flex-center")
    filtres.appendChild(btnFiltres)
    const btnAll = document.createElement('button')
    btnAll.id = '0'
    btnAll.classList.add("btn")
    btnAll.innerText = 'Tous'
    btnFiltres.appendChild(btnAll)

// Création liste des catégories pour les filtres et la modal2
    for(c = 0; c<cat.length; c++){
        const option = document.createElement("option")
        option.id = cat[c].id
        option.setAttribute('value', cat[c].name)
        option.setAttribute('name', 'cat')
        option.innerText = cat[c].name
        listeCategories.appendChild(option)
        const buttons = document.createElement("button")
        buttons.innerText = cat[c].name
        buttons.id = cat[c].id
        buttons.classList.add("btn")
        btnFiltres.appendChild(buttons)
    }
    listeCategories.selectedIndex = -1

    // mise en place du filtrage dynamique de la page au clique sur les différentes catégories
    const btns = document.querySelectorAll('.btn')

    let btnSelected = btns[0]
    btnSelected.classList.add('selected')
    for(b = 0; b < btns.length; b++){
        btns[b].addEventListener('click', (event) => {
            const testTarget = event.target
            if(testTarget != btnSelected){
                btnSelected.classList.remove('selected')
                btnSelected = testTarget
                btnSelected.classList.add('selected')
            }
        })
        const btnName = btns[b]
        if(btnName.textContent != 'Tous'){
            btns[b].addEventListener('click', () => {
                const filteredGallery = gallery.filter(obj => obj.category.name === btnName.textContent)
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
        form.reset()
        listeCategories.selectedIndex = -1
    }

// appel de la fonction pour generer la gallerie d'image avec les titres dans la section portfolio
    genererGallerie(gallery, gall)

// appel de la fonction pour generer la gallerie dans la modal avec les boutons de suppresion
    genererGallerie(gallery, gallerie)

// Création de la suppresion des images de la gallerie via la modal1
    const btnDelete = document.querySelectorAll('.delete')
    for(buttons = 0; buttons<btnDelete.length; buttons++) {
        let id = btnDelete[buttons].id
        btnDelete[buttons].addEventListener('click', async() => {
            const reponse3 = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + jeton 
                }
            })
            console.log(reponse3)
            const newGallerie = gallery.filter(obj => obj.id != id)
            gall.innerHTML = ''
            gallerie.innerHTML = ''
            genererGallerie(newGallerie, gall)
            genererGallerie(newGallerie, gallerie)
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
    const listeLi = document.querySelectorAll('li')
    listeLi[0].setAttribute('style', 'font-weight : bold')

// Après la connexion d'un utilisateur
    if (jeton !== null ){
        filtres.setAttribute('hidden', '')
        reveal.forEach((element) => {
            element.removeAttribute('hidden')
        })

// Modification pour login qui devient logout après la connexion
        const login = document.querySelector('li a')
        login.textContent = 'logout'
        login.setAttribute('href', '#')

// Au clique sur logout le token est effacé et une redirection sur l'index non connecté se fait
        login.addEventListener('click', () => {
            login.setAttribute('href', 'index.html')
            window.sessionStorage.removeItem('token')
            
        })
    }
})()