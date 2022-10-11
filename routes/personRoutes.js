const router = require('express').Router()
const Person = require('../models/Person')

// C - create
router.post('/', async (req, res) => {

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved
  }

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatório!' })
    return
  }

  try {
    await Person.create(person)
    res.status(201).json({ message: 'User inserido com sucesso.' })
  }
  catch (error) {
    res.status(500).json({ error: error })
  }

})

// R - Read
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'User não encontrado.' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// U - Update data
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const {name, salary, approved} = req.body
  const person = {
    name,
    salary,
    approved
  }

  try {
    const updatedPerson = await Person.updateOne({_id: id}, person)
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({message: 'User não encontrado.'})
      return
    }
    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// D - data deletion

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findOne({_id: id})
  
  if (!person) {
    res.status(422).json({ message: 'User não encontrado.' })
    return
  }

  try {
    await Person.deleteOne({_id: id})
    res.status(200).json({ message: 'User removido com sucesso.' })

  } catch (error) {
      res.status(500).json({ error: error })
  }
  
})

// rota inicial
router.get('/', (req, res) => {
  res.json({ message: "Hello World." })
})

module.exports = router