var dbPromise = idb.open("favorite", 1,function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        var teamsOS = upgradeDb.createObjectStore("teams", { keyPath: "id" });
        teamsOS.createIndex("nama", "nama", {unique: false});
        teamsOS.createIndex("id", "id", { unique: true });
    }
});

function addToFavorite(nama, id) {
    console.log(document.querySelector('#atf'));
    dbPromise.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        var item = {
            'nama': nama,
            'id': id
        };
        store.add(item); //menambahkan key "team"
        return tx.complete;
    }).then(function() {
        console.log('Team favorit ' + nama + ' berhasil ditambahkan.');
    }).catch(function() {
        console.log('Team favorite gagal ditambahkan.')
    })   
}

function showFavorite() {
    let favListTeam ='';
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
    
        return store.openCursor();
    }).then(function ambilBuku(cursor) {
        if (!cursor) {
            return;
        }
        console.log('Posisi cursor: ', cursor.key);
        console.log(cursor.value['nama']);
        //doing anything here
        favListTeam += `
            <tr>
                <td id="team_${cursor.value['id']}">
                    ${cursor.value['nama']}<div class="right"><a class="waves-effect waves-light btn red darken-1 right-align" onclick="deleteFavorite(${cursor.value['id']})"><img src="./img/delete.svg" style="margin-top: 5px;"/></a></div>
                </td>
            </tr>
        `;
        return cursor.continue().then(ambilBuku);
    }).then(function () {
        console.log("Tidak ada data lain.");
        document.getElementById("team-favorite").innerHTML = favListTeam;
    });   
}

function deleteFavorite(id) {
    dbPromise.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(id);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
        location.reload();
    }).catch(function () {
        console.log('item gagal dihapus');
    });    
}
