const dbQuery = require('../database/dbQuery');

const errorMessage = { status: 'error'};
const successMessage = { status: 'success'};

const getAllPensieri = async (request, response) => {

  const getAllPensieriQuery = 'SELECT * FROM Pensieri ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllPensieriQuery, );
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'No records found in Pensieri';
      return response.status(404).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return response.status(200).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return response.status(500).send(errorMessage);
  }
}

const addPensiero = async (request, response) => {

  const {
    pensiero, backgroundcolor, igUsername, textcolor
  } = request.body;

  const addPensieroQuery = 
  'INSERT INTO Pensieri (pensiero, backgroundcolor, igUsername, textcolor, enabled, insertdate ) VALUES ($1, $2, $3, $4, true, now()) returning *';

  const values = [
    pensiero,
    backgroundcolor,
    igUsername,
    textcolor
  ];

  try {
    const { rows } = await dbQuery.query(addPensieroQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return response.status(200).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return response.status(500).send(errorMessage);
  }
}

module.exports = {
    getAllPensieri,
    addPensiero
};

