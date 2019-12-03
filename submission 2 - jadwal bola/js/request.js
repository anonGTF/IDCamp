var base_url = "https://api.football-data.org/v2/";
var token = '60672266e78d4a8682b67eb972475cee';
var fetchApi = function (url) {
    return fetch(url, {
        'headers': {
            'X-Auth-Token': token
        }
    })
    .then(status)
    .then(json)
}
function status(response) {
    if (response.status !== 200) {
        console.log("Error: "+response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error: "+ error);
}

function getStanding() {
    if ('caches' in window) {
        caches.match(base_url + "competitions/2021/standings").then(function (response) {
            if(response){
                response.json().then(function (data) {
                var standingsHTML = "";
                data.standings[0].table.forEach(function (teams) {
                var str = JSON.stringify(teams).replace(/http:/g, 'https:');
                teams = JSON.parse(str);
                standingsHTML += `
                    <tr>
                    <td>${teams.position}</td>
                    <td><img src='${teams.team.crestUrl}' width='32' height='32'></td>
                    <td class="hide-on-small-only">${teams.team.name}</td>
                    <td>${teams.playedGames}</td>
                    <td>${teams.won}</dh>
                    <td>${teams.draw}</td>
                    <td>${teams.lost}</td>
                    <td>${teams.goalDifference}</td>
                    <td>${teams.points}</td>
                    </tr>
                    `;
                });
                document.getElementById("teams-standing").innerHTML = standingsHTML;
                })
            }
        })
    }

    fetchApi(base_url + "competitions/2021/standings")
        .then(function (data) {
        var standingsHTML = "";
        data.standings[0].table.forEach(function (teams) {
            var str = JSON.stringify(teams).replace(/http:/g, 'https:');
            teams = JSON.parse(str);
            standingsHTML += `
            <tr>
            <td>${teams.position}</td>
            <td><img src='${teams.team.crestUrl}' width='32' height='32'></td>
            <td class="hide-on-small-only">${teams.team.name}</td>
            <td>${teams.playedGames}</td>
            <td>${teams.won}</dh>
            <td>${teams.draw}</td>
            <td>${teams.lost}</td>
            <td>${teams.goalDifference}</td>
            <td>${teams.points}</td>
            </tr>
            `;
        });
        document.getElementById("teams-standing").innerHTML = standingsHTML;
    }).catch(error);
}

function getTeams() {
    if ('caches' in window) {
        caches.match(base_url + "competitions/2021/teams").then(function (response) {
            if(response){
                response.json().then(function (data) {
                    var listHTML = "";
                    data.teams.forEach(function (team) {
                        var str = JSON.stringify(team).replace(/http:/g, 'https:');
                        team = JSON.parse(str);
                        listHTML += `
                        <div class="col s12 m7">
                        <div class="card horizontal hoverable">
                          <div class="card-image valign-wrapper">
                            <img src="${team.crestUrl}" width="100" height="100" class="team-logo">
                          </div>
                          <div class="card-stacked">
                            <div class="card-content">
                              <h3>${team.name}</h3>
                            </div>
                            <div class="card-action">
                              <a href="#" class="deep-purple-text text-darken-4">Add to favorite</a>
                            </div>
                          </div>
                        </div>
                      </div>
                        `;
                    });
                    document.getElementById("teams-list").innerHTML = listHTML;
                })
            }
        })
    }

    fetchApi(base_url + "competitions/2021/teams")
        .then(function (data) {
        var listHTML = "";
        data.teams.forEach(function (team) {
            var str = JSON.stringify(team).replace(/http:/g, 'https:');
            team = JSON.parse(str);
            listHTML += `
            <div class="col s12 m7">
            <div class="card horizontal hoverable">
              <div class="card-image">
                <img src="${team.crestUrl}" width="50" height="50" class="team-logo">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h6>${team.name}</h6>
                </div>
                <div class="card-action">
                  <a class="deep-purple-text text-darken-4" onclick="addToFavorite(${team.name}, ${team.id});">Add to favorite</a>
                </div>
              </div>
            </div>
          </div>
            `;
        });
        document.getElementById("teams-list").innerHTML = listHTML;
    }).catch(error);
}