const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../database/models/user')

const getUsers = (req, res) => {
    Users.find()
    .then(users => {
      users.forEach(user => {
        user.name = user.first_name + " " + user.last_name
        delete user.first_name
        delete user.last_name
        delete user.password
      })
      res.json(users);
    })
    .catch(err => {
      res.json({message: 'You shall not pass' + '-' + err.message})
    });
}

const getUserById = (req, res) => {
    const {id} = req.params
    Users.findById(id)
    .then(user => {
        if(user) {
            req.user = user
            res.status(200).json(user)
        } else {
            res.status(400).json({message: "invalid user ID"})
        }
    })
}

const register = (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
}


const login = (req, res) => {
    let { email, password } = req.body;

    Users.findBy({ email })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // THIS HERE IS THE PLACE TO MAKE THE TOKEN
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.first_name}!`,
            token: token,
            user_id: user.id
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
}

function generateToken(user) {
    const payload = {
      subject: user.id,
      email: user.email,
      position: user.position,
    }
    const options = {
      expiresIn: '1d',
    }
  
    const result = jwt.sign(
      payload,
      process.env.DB_ENV === 'development' ? 'devsecret' : process.env.SECRET,
    //   "A SECRETED SECRET'S SECRET",
      options,
    )
  
    return result;
  }

  module.exports = {
    register,
    login,
    getUsers,
    getUserById
}
