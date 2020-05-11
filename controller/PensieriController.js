const dbQuery = require('../database/dbQuery');
const Pensiero= require('../database/models').Pensiero;
const errorMessage = { status: 'error'};
const successMessage = { status: 'success'};

const getAllPensieri = async (req, res) => {
  if (!req.user) return res.status(403).render('error/403');

  Pensiero.findAll({
    where: {
      enabled: true
    },
    order: [
      ['createdAt','DESC'],
    ],    
  }
  ).then(pensieri => {
    if (pensieri[0] === undefined) {
      errorMessage.error = 'No records found in Pensieri';
      return res.status(404).send(errorMessage);
    }
    successMessage.data = pensieri;
    return res.status(200).send(successMessage);
  }).catch(function (err) {
    errorMessage.error = 'An error Occured';
    return res.status(500).send(errorMessage);
  });

}

const addPensiero = async (req, res) => {
  try {
    if (!req.user) return res.status(403).render('error/403');
    req.body.enabled = true;
    const pensiero = await Pensiero.create(req.body);
    return res.status(201).json({ pensiero });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }

}

module.exports = {
    getAllPensieri,
    addPensiero
};

