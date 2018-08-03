const database = require("./database-connection");

module.exports = {
    list() {
        return database("student").select();
    },
    read(id) {
        return database("student")
            .select()
            .where("id", id)
            .first();
    },
    create(student) {
        return database("student")
            .insert(student)
            .returning("*")
            .then(record => record[0]);
    },
    update(id, student) {
        return database("student")
            .update(student)
            .where("id", id)
            .returning("*")
            .then(record => record[0]);
    },
    delete(id) {
        return database("student")
            .delete()
            .where("id", id);
    }
};
