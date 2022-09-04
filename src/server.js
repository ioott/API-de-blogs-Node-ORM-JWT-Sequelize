require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const blogController = require('./controllers/blogController');
const tokenValidation = require('./middlewares/auth');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.post('/login', blogController.login);
app.post('/user', blogController.createUser);
app.get('/user/:id', tokenValidation, blogController.getUserById);
app.get('/user', tokenValidation, blogController.getUser);
// app.post('/categories', );
// app.get('/categories', );
// app.post('/post', );
// app.get('/post/:id', );
// app.get('/post',);
// app.put('/post/:id', );
// app.delete('/post/:id', );
// app.delete('/user/me', );
// app.get('/post/search?q=', );

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, req, res, _next) => {
  const { code, message } = err;
  return res.status(code).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
