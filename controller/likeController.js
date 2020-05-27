const { Like }= require('../database/models');

const addLike = async (req, res) => {
  try {
    if (!req.user) return res.status(403).render('error/403');
    let data = {
        pensieroId: req.body.pensieroId,
        userId: req.user.id
    };
    
    /*Like.findOne({
      where: data
    }).then(function(){
     
    });*/
    const like = await Like.create(data);
    return res.status(201).json({ like });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const removeLike = async (req, res) => {
  try {
    if (!req.user) return res.status(403).render('error/403');

    const like = 
    await Like.destroy({
        where: {
          pensieroId: req.body.pensieroId,
          userId: Request.user.id
        }
    });
    return res.status(201).json({ like });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
    addLike,
    removeLike
};

