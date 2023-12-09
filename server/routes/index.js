var express = require('express');
var router = express.Router();
var User = require('../models/user');

// LOGIN
// GET tout les users puis vérifie la présence de celui du req
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET spécifique (dans le cas ou on cherche à obtenir les infos d'un user)
router.get("/:id", getUser, async (req, res) => {
    res.json(res.user)
})

// REGISTER
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// CHANGEMENT DE MDP / USERNAME / EMAIL
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email
    } if (req.body.username != null) {
        res.user.username = req.body.username
    } if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// SUPPRESSION DE COMPTE
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'Compte supprimé' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// MIDDLEWARE (permet de confirmer si l'écrit qu'on cherche existe)
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Utilisateur introuvable" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router