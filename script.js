// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"

const characterContainer = document.getElementById('character-container')

const page = 2
const basURL = 'https://rickandmortyapi.com/api'

const loadCharacter = async () => {
    const res = await fetch(`${basURL}/character/?page=${page}`)
    const data = await res.json()
    const limitData = data.results.slice(0)
    return {results: limitData}
} 

const loadLocation = async () => {
    const res = await fetch(`${basURL}/location`)
    return await res.json()
}
const loadEpisode = async () => {
    const res = await fetch(`${basURL}/episode`)
    return await res.json()
}

const loadAllWithPromiseAll = async () => {
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()
    ])
    showCharacter(character.results)
    console.log(location.results)
    console.log(episode.results)
}   

loadAllWithPromiseAll()

const showCharacter = (characters) => {
    characters.map(e => {
        const divCharacters = document.createElement('div')
        
        divCharacters.innerHTML = `
            <img src="${e.image}"></img>
            <div class="info">
                <h1>Name: ${e.name}</h1>
                <span>${e.status} - ${e.gender}</span>
                
                <span class="location">Location: </span>
                <a href="${e.location.url}">${e.location.name}</a>
                
                <span class="origin">Origin: </span>
                <a href="${e.origin.url}">${e.origin.name}</a>
            </div>
        `
        divCharacters.classList.add('character-box')
        characterContainer.appendChild(divCharacters)    
    });


}