const mail = document.getElementById('mail');
const mdp = document.getElementById('mdp');
const btn = document.querySelector('input[type=submit]')

const form = document.querySelector('form');



(async() => {
    const listeLi = document.querySelectorAll('li')
    listeLi[2].setAttribute('style', 'font-weight : bold')
    form.addEventListener('submit', async(event) => {
        event.preventDefault()
    
        const user = {
            email : event.target.querySelector('[name=mail]').value,
            password : event.target.querySelector('[name=mdp]').value
        }
        const chargeUtile = JSON.stringify(user)
    
        const reponse = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 
                'accept': 'application/json',
                'Content-Type': 'application/json'
            } ,
            body: chargeUtile
        })
        if( reponse.status === 200){
            const log = await reponse.json()
            const token = log.token
            window.sessionStorage.setItem ('token', token)
            window.location.href='index.html'
        }
        else {
            document.querySelector('.error').removeAttribute('hidden')
            
        }
    });
})()



