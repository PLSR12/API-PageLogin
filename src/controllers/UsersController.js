import User from '../models/User'

import { createPasswordHash } from '../services/auth'

class UsersController {
  async index (req, res) {
    try {
      const users = await User.find()
      return res.status(201).json(users)
    } catch (err) {
      return res.status(404).json({ error: 'Internal error server' })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user) {
        return res.status(200).json()
      }
      return res.json(user)
    } catch (err) {
      return res.status(500).json({ error: 'Internal error server' })
    }
  }

  async create (req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const newUser = await User.create({
        email,
        password
      })

      return res.status(201).json(newUser)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal error server' })
    }
  }
}

export default new UsersController()
