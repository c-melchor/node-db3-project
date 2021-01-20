// scheme-model
const db = require("../../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },
  findById(id) {
    return db("schemes")
      .where("id", id)
      .first();
  },
  findSteps(id) {
    return db("schemes as s")
      .join("steps as t", "s.id", "t.scheme_id")
      .select("s.id", "s.scheme_name", "t.step_number", "t.instructions")
      .orderBy("t.step_number")
      .where("s.id", id);
  },
  add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([scheme_id]) => {
        return db("schemes")
          .where("id", scheme_id)
          .first();
      });
  },
  update(changes, id) {
    return db("schemes")
      .where("id", id)
      .update(changes)
      .then(scheme_id => {
        return db("schemes")
          .where("id", scheme_id)
          .first();
      });
  },
  remove(id) {
    return db("schemes")
      .where("id", id)
      .del()
      .then(scheme_id => {
        return db("schemes")
          .where("id", scheme_id)
          .first();
      });
  }
};
