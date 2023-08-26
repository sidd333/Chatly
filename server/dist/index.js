"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _auth = _interopRequireDefault(require("./src/routes/auth"));
var _notes = _interopRequireDefault(require("./src/routes/notes"));
var _db = _interopRequireDefault(require("./src/database/db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//routes 

_dotenv.default.config();
(0, _db.default)();
const app = (0, _express.default)();
const port = 4000;
app.use(_express.default.json());
// app.use('/api/notes', notes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', _auth.default);
app.use('/api/notes', _notes.default);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});