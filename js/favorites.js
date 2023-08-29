export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
            .then(data => data.json())
            .then(({ login, name, public_repos, followers }) => ({
                login,
                name,
                public_repos,
                followers,
            }))
    }
}

// Classe da logica dos dados

class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()

        GithubUser.search('psixp').then(user => console.log(user))
    }

    load() {

        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []


    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this,this.entries))
    }

    async add(username) {
        try {
            const user = await GithubUser.search(username)

            if(user.login === undefined) {
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error) {
            alert(error.message)
        }

    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry =>
            entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}


// Classe da visualizacao dos eventos

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
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