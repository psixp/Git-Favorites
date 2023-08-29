// Classe da logica dos dados

class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [{
            login: 'psixp',
            name: 'Pablo Flores',
            public_repos: '117',
            followers: '20001'

        }]

        
        
        
    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => 
            entry.login !== user.login)
    }
}


// Classe da visualizacao dos eventos

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            console.log(user)
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            
            row.querySelector('.remove').onclick = () => {
                const isOK = confirm('Tem certeza que deseja deletar essa linha ?')
                if (isOK) {
                    this.delete(user)
                }
            }
            
            this.tbody.append(row)
        })

    }

    createRow() {

        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="user">
            <img src="http://github.com/psixp.png" alt="foto do usuario">
            <a href="http://github.com/psixp" target="_blank">
                <p>Pablo Flores</p>
                <span>psixp</span>
            </a>
        </td>
        <td class="repositories">
            117
        </td>
        <td class="followers">
            1000
        </td>
        <td class="remove">
            <button><i class="fa-solid fa-xmark"></i></button>
        </td>`

        return tr
    }


    removeAllTr() {

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
    }
}