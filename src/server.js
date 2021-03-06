const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();
//aqui eu defino que todo mundo pode acessar minha aplicação de qualquer dominio

//git init
//git add README.md
//git commit -m "first commit"
//git remote add origin https://github.com/johnpaulwynow/backend-box.git
//git push -u origin master
// criar arquivo .gitkeep 
//

//git add .    //toda a aplicação  
//git status para ver o que ainda não foi adicionado novo no repositorio
//git config --global user.email "xxxxx"
//git config --global user.name "Your Name"

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//criar sala expecifica para 
io.on("connection", socket =>{
   socket.on('connectRoom', box =>{
      socket.join(box);
   })
})

//requisições do tipo http e socket oks
mongoose.connect("mongodb+srv://john:xxx@cluster0-dhda7.mongodb.net/test?retryWrites=true",
{
   useNewUrlParser: true
}
);
//passando o io para a app  middle global next()passa para o restro da aplicação
app.use((req,res,next) =>{
   req.io = io;

   return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//deixar estatico sempre que precisar acessar os arquivo diretamente , passa o express pra ajudar nas rotas e o path para os diretorios
//criando o redirecionamento para acesso aos arquivos
app.use("/files", express.static(path.resolve(__dirname, "..","tmp")));

app.use(require("./routes"));
var port = process.env.PORT || 8080;
//variavel de ambiente para executar a porta de forma que o heroku possa acessar a porta
console.log("API rodando na porta: " + port);
app.listen(port); //acessa a porta que estiver liberado ou a porta 3333 || 8080

//add cors para determinar quem pode acessar a aplicação yarn add cors
//deixar a aplicação real time instalando yarn add socket.io
/*

If you use npm:

git rm yarn.lock
git commit -m "Remove yarn lock file"
git push heroku master

/*
/*
If you use yarn:

git rm package-lock.json
git commit -m "Remove npm lock file"
git push heroku master


instalando heroku na aplicação via npm
npm install -g heroku


heroku login

resolvendo problemas 

npm install -g lodash

rm -rf node_modules
npm install

*/