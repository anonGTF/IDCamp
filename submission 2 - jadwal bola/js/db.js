var dbPromise = idb.open("favorite", 1,function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        var teamsOS = upgradeDb.createObjectStore("teams", { keyPath: "id" });
        teamsOS.createIndex("nama", "nama", {unique: false});
        teamsOS.createIndex("id", "id", { unique: true });
    }
});

function addToFavorite(nama, id) {
    console.log(nama);
    alert("ditambahkan");
    /*dbPromise.then(function(db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        var item = {
            'nama': 'haha',
            'id': 123
        };
        store.add(item, 123); //menambahkan key "team"
        return tx.complete;
    }).then(function() {
        console.log('Team favorit berhasil ditambahkan.');
    }).catch(function() {
        console.log('Team favorite gagal ditambahkan.')
    })*/   
}