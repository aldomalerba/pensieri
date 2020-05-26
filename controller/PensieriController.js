const dbQuery = require('../database/dbQuery');
const { Pensiero, User }= require('../database/models');
const errorMessage = { status: 'error'};
const successMessage = { status: 'success'};

const getAllPensieri = async (req, res) => {
  if (!req.user) return res.status(403).render('error/403');

  Pensiero.findAll({
    where: {
      enabled: true
    },
    include    : [{ model: User, attributes: ['displayName', 'username', 'picture'], required: true}],
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

const getPensieriBySessionUser= async (req, res) => {

  if (!req.user) return res.status(403).render('error/403');

  Pensiero.findAll({
    where: {
      userId: req.user.id,
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
    req.body.userId = req.user.id;
    const pensiero = await Pensiero.create(req.body);
    return res.status(201).json({ pensiero });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
    getAllPensieri,
    addPensiero,
    getPensieriBySessionUser
};

