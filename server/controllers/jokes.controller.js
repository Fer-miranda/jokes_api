const Joke = require("../models/jokes.model");

module.exports.findAllJokes = (req, res) => {
  Joke.find()
    .then(allJokes => res.json({ Jokes: allJokes }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findJoke = (req, res) => {
	Joke.findOne({ _id: req.params.id })
		.then(oneSingleJoke => res.json({ Joke: oneSingleJoke }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createJoke = (req, res) => {
  Joke.create(req.body)
    .then(newlyCreatedJoke => res.json({ Joke: newlyCreatedJoke }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateJoke = (req, res) => {
  Joke.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedJoke => res.json({ Joke: updatedJoke }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteJoke = (req, res) => {
  Joke.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findRandomJoke = (req, res) => {
  Joke.aggregate([{ $sample: { size: 1 } }]) //se utiliza la operación $sample para obtener una muestra aleatoria de la colección. La opción size: 1 indica que solo se debe obtener un elemento aleatorio.
    .then(randomJoke => {
      res.json({ Joke: randomJoke[0] }); //se accede al primer elemento del arreglo utilizando randomJoke[0]
    })
    .catch(err => {
      res.json({ message: "Something went wrong", error: err });
    });
};

// module.exports.findRandomJoke = (req, res) => {
//   Joke.countDocuments() //obtener el número total de chistes en la base de datos
//     .then(count => {
//       const randomIndex = Math.floor(Math.random() * count); //índex aleatorio
//       return Joke.findOne().skip(randomIndex).exec(); //tres métodos de consulta de mongoose. FindOne que busca un solo documento de la colección (lo usé más arriba, pero esta vez no tiene criterio de búsqueda)
//     })
//     .then(randomJoke => {
//       res.json({ Joke: randomJoke }); //envía joke en formato json
//     })
//     .catch(err => {
//       res.json({ message: "Something went wrong", error: err });
//     });
// };