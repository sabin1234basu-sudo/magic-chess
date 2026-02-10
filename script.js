const heroContainer = document.getElementById("heroContainer");
const teamContainer = document.getElementById("team");
const synergyContainer = document.getElementById("synergy");
const searchInput = document.getElementById("search");

let team = [];

// Display heroes
function displayHeroes(list) {
    heroContainer.innerHTML = "";

    list.forEach(hero => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${hero.img}" alt="${hero.name}">
            <h4>${hero.name}</h4>
            <p>${hero.role}</p>
        `;

        card.onclick = () => addHero(hero);
        heroContainer.appendChild(card);
    });
}

// Add hero
function addHero(hero) {
    if (team.length >= 5) {
        alert("Team full!");
        return;
    }

    if (team.find(h => h.name === hero.name)) {
        alert("Already selected");
        return;
    }

    team.push(hero);
    updateTeam();
}

// Remove hero
function removeHero(index) {
    team.splice(index, 1);
    updateTeam();
}

// Update team display
function updateTeam() {
    teamContainer.innerHTML = "";

    team.forEach((hero, index) => {
        const div = document.createElement("div");
        div.className = "team-card";

        div.innerHTML = `
            <img src="${hero.img}">
            <span>${hero.name}</span>
        `;

        div.onclick = () => removeHero(index);
        teamContainer.appendChild(div);
    });

    updateSynergy();
}

// Synergy count by role
function updateSynergy() {
    const count = {};

    team.forEach(hero => {
        count[hero.role] = (count[hero.role] || 0) + 1;
    });

    synergyContainer.innerHTML = "";

    for (let role in count) {
        const p = document.createElement("p");
        p.textContent = role + ": " + count[role];
        synergyContainer.appendChild(p);
    }
}

// Search
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = heroes.filter(hero =>
        hero.name.toLowerCase().includes(value)
    );
    displayHeroes(filtered);
});

// Initial load
displayHeroes(heroes);
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    team = []; // clear team array
    document.getElementById("team").innerHTML = ""; // clear team UI
    document.getElementById("synergy").innerHTML = ""; // clear synergy
});

