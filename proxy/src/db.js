const Datastore = require('nedb-promises');

let datastore = Datastore.create({
    filename: 'db/tx.db',
    timestampData: true,
});

exports.db = {
    save: function (tx, height, timestamp) {
        return datastore.insert({
            height,
            tx,
            timestamp,
        });
    },
    get: async function (limit) {
        return datastore.find({}).sort({ createdAt: -1 }).limit(limit);
    },
};
