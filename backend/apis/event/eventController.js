const Event = require("./eventModel");

function createEvent(req, res, next) {
  console.log('in conroller');
  Event.create(req.body)
    .then((event) => {
      return res.status(201).json({ event });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  createEvent,
};
