const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbajisaka"
})

app.post("/register", (req, res) => {
  const nama_lengkap = req.body.nama_lengkap;
  const jenis_kelamin = req.body.jenis_kelamin;
  const tanggal_lahir = req.body.tanggal_lahir;
  const alamat_lengkap = req.body.alamat_lengkap;
  const telpon = req.body.telpon;
  const email = req.body.email;

  db.query(
    "INSERT INTO user (nama_lengkap, jenis_kelamin, tanggal_lahir, alamat_lengkap, telpon, email) VALUES (?,?,?,?,?,?)",
    [nama_lengkap, jenis_kelamin, tanggal_lahir, alamat_lengkap, telpon, email],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        res.send(result)
      } else {
        res.send({message: "Unmatch"})
      }
    }
  );
});

app.get('/register', (req,res)=> {
	db.query('SELECT * FROM user', (err, rows, fields)=>{
		if(!err){
      // console.log(rows[0], EmpID);
      res.send(rows)
    } else {
      console.log(err)
    }
  })
})

app.listen(3001, () => {
  console.log('database connection established')
});