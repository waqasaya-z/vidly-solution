const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const movieGenre = [ 
	{ id:1, genre: 'Action' }, 
	{id: 2, genre: 'Comedy' }, 
	{ id:3, genre: 'Horror' } 
	]

app.get('/api/genre', (req,res) => {
	res.send(movieGenre);
})

function validateCourse(course){
 const schema = Joi.object({
 genre: Joi.string().min(3).required()
 });
  
 return schema.validate(course); 
}

app.post('/api/genre', (req, res) => {
  const { error } = validateCourse(req.body);
  
  if(error){
  res.status(400).send('Genre Must be atleast 3 characters')
  return;
  }	
	const newGenre = {
		id: movieGenre.length + 1,
		genre: req.body.genre
	}
	movieGenre.push(newGenre);
	res.send(movieGenre);
})

app.put("/api/genre/:id", (req,res) => {
 const updatedGenre = movieGenre.find(c => c.id ===  parseInt(req.params.id));
  if(!updatedGenre){
  	res.send(400).send('Bad Request');
  	return;
  }

 const { error } = validateCourse(req.body);
  
  if(error){
  res.status(400).send('Genre Must be atleast 3 characters')
  return;
  }	
  
  updatedGenre.genre = req.body.genre;
  res.send(movieGenre);

})

app.delete('/api/genre/:id', (req,res) => {
  const deleteGenre = movieGenre.find(c => c.id ===  parseInt(req.params.id));
  if(!deleteGenre){
  	res.send(400).send('Bad Request');
  	return;
  }

  const index = movieGenre.indexOf(deleteGenre);
  movieGenre.splice(index, 1);
  res.send(movieGenre);
});


app.listen(3000, () => {
	console.log('Server is running on port 3000')
})