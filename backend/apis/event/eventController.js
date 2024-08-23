const Event = require("./eventModel");

function createEvent(req, res, next) {
  Event.create(req.body)
    .then((event) => {
      return res.status(201).json({ event });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function getAllEvents(req, res, next) {
  Event.findAll()
    .then((events) => {
      return res.status(200).json({ events });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

function deleteEvent(req, res, next) {
  const eventId = req.params.id;
  Event.destroy({
    where: {
      id: eventId,
    },
  })
    .then(() => {
      return res.status(200).json({ message: "Deleted successfully." });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}

module.exports = {
  createEvent,
  getAllEvents,
  deleteEvent,
};
