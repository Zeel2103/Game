window.addEventListener('DOMContentLoaded', loadRanking);

function loadRanking() {
    const rankingDiv = document.querySelector('#Ranking');
    let rankingStr = `<table><tr><th>Name</th><th>Score</th></tr>`;// Ranking table will load on the page

    const keys = Object.keys(localStorage);

    for (let key of keys) {
        // Retrieve each user object from localStorage
        const user = JSON.parse(localStorage.getItem(key));
        
        // Check if the user object contains 'name' and 'topScore' properties
        if (user.name && user.topScore !== 0) {
            rankingStr += `<tr><td>${user.name}</td><td>${user.topscore}</td></tr>`; //name and topscore properties formatted into the table
        }
    }

    rankingStr += "</table>"; 
    rankingDiv.innerHTML = rankingStr;
}
