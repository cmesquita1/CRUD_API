const router = require("express").Router();
const Person = require("../models/Person");

// Creating datas
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };

  if (!name) {
    res.status(422).json({ message: "Dados obrigatórios!" });
    return;
  }

  try {
    await Person.create(person);
    res.status(201).json({ message: "Pessoa adicionada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Reading data
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.send(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: "Pessoa não encontrada!" });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPerson = await Person.updateOne({ _id: id }, req.body);
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "Falha!" });
      return;
    }
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: "Usuário não encontrado!" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
