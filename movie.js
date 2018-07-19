const express = require("express");
const joi = require("joi");

app = express();
app.use( express.json());
let genres = [{id: 0 , title: "Comedy"} , {id: 1 ,title: "Action"} , {id: 2 , title: "Adventure"}];

app.get("/genres" , (req,res) => {
    return res.send(genres);
});

app.get("/genre/:id" , (req,res) => {
    const {error} = isvalid(req.params);
    if(error) return res.send(error).status(400);
    const found = genres.find(genre =>  genre.id === parseInt(req.params.id));
    if(!found) return res.send("Invalid ID [Not Found]").status(404);
    res.send(found);
});

app.post("/genre" , (req,res) => {
    const {error} = isvalid(req.body);
    if(error) return res.send(error.details[0].message).status(400);
    const found = genres.find(genre =>  genre.name === parseInt(req.body.title));
    if(found) return res.send("Title Already Exists").status(404);
    let genre = {title: req.body.title , id: genres.length+1};
    genres.push(genre);
    res.send(genres);
});

app.put("/genre/:id" , (req,res) => {
    const {error} = isvalid(req.body);
    if(error) return res.send(error).status(400);
    const found = genres.find(genre =>  genre.id === parseInt(req.params.id));
    if(!found) return res.send("Invalid ID [Not Found]").status(404);
    found.title = req.body.title;
    res.send(genres);
});

app.delete("/genre/:id" , (req,res) => {
    const {error} = isvalid(req.params);
    if(error) return res.send(error).status(400);
    const found = genres.find(genre =>  genre.id === parseInt(req.params.id));
    if(!found) return res.send("Invalid ID [Not Found]").status(404);
    genres.splice( genres.indexOf(req.params.id) );
    res.send(genres);

});

const isvalid = (x) => {
    const schema = {
        title: joi.string().min(4).max(20),
        id: joi.number().integer()
    };
    return joi.validate(x , schema);
}

app.listen(80,() =>{
console.log("Listening");

});
