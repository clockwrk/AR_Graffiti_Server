/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

let chalk = require('chalk');
var path = require('path');
let fs = require('fs');
let imgGen = require('js-image-generator')
let _ = require('lodash');
let db = require('./server/db');
let User = db.model('user')
let Drawing = db.model('drawing');
let Location = db.model('location');
let Stroke =  db.model('stroke');
let Text =  db.model('text')
let Promise = require('sequelize').Promise;

 var drawingPath =  path.join(__dirname, '/server/db/models/drawings/')

let getRandomInt = (min,max) => {
    return _.random(min,max)
}

let randomTrueFalse = () => {
    return !!_.random(0,1)
}

let getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[_.floor(_.random(16))];
    }
    console.log(color);
    return color;
}

getRandomColor();


let randomDotGrid = () => {
    let grid = new Array(200).fill(new Array(200).fill(randomTrueFalse()))

    console.log(grid);
    // grid.map()
    // if(randomTrueFalse){
    //
    // }
    //
    // return
}




// console.log(randomDotGrid());



let seedUsers = function () {

    let users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    let creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

 console.log(__dirname);

let seedDrawings = function(){

    let imageCollection = []

    for(let imageNumber = 0; imageNumber < 20; imageNumber++ ){

        imgGen.generateImage(800, 600, 80, function(err, image){

            fs.writeFileSync(path.join(drawingPath)+'dummy'+imageNumber+'.jpg', image.data);
            imageCollection[imageNumber] = {directoryPath:path.join(drawingPath, 'dummy'+imageNumber+'.jpg')}
        })
    }

    let creatingDrawings =  imageCollection.map((drawingObj) => {
        return Drawing.create(drawingObj);
    })

    return Promise.all(creatingDrawings)

}

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(() => {
        return seedDrawings();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
