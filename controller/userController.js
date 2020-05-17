const { Pensiero, User }= require('../database/models');

const getProfileByUsername = async (req, res) => {

  if (!req.user) return res.status(403).render('error/403');

  User.findOne({
      where:{
          username: req.params.username
      },
      include    : [{ model: Pensiero }],
  }).then(function(user){
    return res.render('profile', {name: user.displayName});
  });
}

const getProfile = async (req, res) => {

    if (!req.user) return res.status(403).render('error/403');
  
    User.findOne({
        where:{
            id: req.user.id
        },
        include    : [{ model: Pensiero }],
    }).then(function(user){
      return res.render('profile', {name: user.displayName});
    });
  }

module.exports = {
    getProfileByUsername,
    getProfile
};
