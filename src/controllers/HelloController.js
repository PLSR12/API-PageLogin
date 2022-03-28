class HelloController {
  async index (req, res) {
    return res.json({ hello: 'tey' })
  }
}

export default new HelloController()
