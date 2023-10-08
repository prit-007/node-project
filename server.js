const express = require('express');
require('dotenv').config();
const person = require('./person');
const bodyParser = require('body-parser');
const conString = process.env.DATABASE_URL;
const { ObjectId } = require('mongoose').Types;
const cors = require('cors');
// This is for MY React component
// const rel= "../attendence-programme/my-programme/build"
// app.use(express.static(path.join(__dirname, rel)));
// app.use(express.static(path.join(__dirname, './views')));
// This is for MongoDB Atlas
const mongoose = require('mongoose');
mongoose.connect(conString)
    .then(() => {
        console.log('connection success');
        const app = express();
        
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json());

        const Person = require('./person');

        //getAll The Person
        app.get('/', async (req, res) => {
            try {
                const people = await Person.find();
                res.json(people);
                console.log(people);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
        //get By id
        app.get('/:id', async (req, res) => {
            try {
                const id = req.params.id;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }

                const person = await Person.findOne({ _id: id });
                if (!person) {
                    return res.status(404).json({ message: 'Person not found' });
                }
                res.json(person);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        //add New
        app.post('/', async (req, res) => {
            const personData = req.body;
            try {
                const newPerson = new Person(personData);
                await newPerson.save();
                res.json(newPerson);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        //Update Person
        app.patch('/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address,
                fbAvatar: req.body.fbAvatar,
                accountBalance: req.body.accountBalance,
                age: req.body.age,
                expireince: req.body.expireince,
                image: req.body.image,
                detail: req.body.detail
            };
            try {
                const updatedPerson = await Person.findOneAndUpdate({ _id: id }, updatedData, {
                    new: false,
                });
                if (!updatedPerson) {
                    return res.status(404).json({ message: 'Person not found' });
                }
                res.json(updatedPerson);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.delete('/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const deletedPerson = await Person.findOneAndDelete({ _id: id });
                if (!deletedPerson) {
                    return res.status(404).json({ message: 'Person not found' });
                }
                res.json({ message: 'Person deleted successfully' });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


        const port = process.env.PORT || 3030;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    )
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });;

