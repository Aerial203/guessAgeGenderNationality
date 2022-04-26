const input = document.querySelector("input")
const div = document.querySelector(".container")
let userName = ""
document.addEventListener("submit", e => {
    e.preventDefault()
    if (!e.target.matches("form")) return
    userName = input.value
    input.value = ""
    fetchData(userName)
    div.innerHTML = ""
})

async function fetchData(userName) {
    const ageEndPoint = `https://api.agify.io?name=${userName}`
    const genderEndPoint = `https://api.genderize.io?name=${userName}`
    nationalityEndpoint = `https://api.nationalize.io?name=${userName}`
    const ageData = await (await fetch(ageEndPoint)).json()
    const genderData = await (await fetch(genderEndPoint)).json()
    const nationalityData = await (await fetch(nationalityEndpoint)).json()
    showData(userName, ageData, genderData, nationalityData)
}

function showData(userName, ageData, genderData, nationalityData) {
    const h1 = document.createElement("h1")
    const ageP = document.createElement("p")
    const genderP = document.createElement("p")
    h1.innerText = `Name: ${userName}`
    ageP.innerText = `Your age might be ${ageData.age}`
    genderP.innerText = `Gender: ${genderData.gender}`
    div.appendChild(h1)
    div.appendChild(ageP)
    div.appendChild(genderP)
    nationalityData.country.forEach(data => {
        if (data.country_id) {
            countryId = data.country_id
            const nationalityP = document.createElement("p")
            nationalityP.innerText = `Your nationality might be from ${countryId}`
            div.appendChild(nationalityP)
        }
    })
}