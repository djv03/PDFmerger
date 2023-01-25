const express = require('express')
const path = require('path');

const port = 3000;
const app = express();

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use('/static',express.static('public'));
const {mergerfunc}=require('./test');   



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./index.html'))
})

app.post('/merge', upload.array('pdfs', 3), async (req, res, next)=> {
    console.log(req.files);

  let name=await  mergerfunc( path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), path.join(__dirname, req.files[2].path));
    res.redirect(`/static/${name}.pdf`);
    // alert(`pdf is saved with name: ${name}`);
    // res.send({data:req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

  
  
app.listen(port, () => {
  console.log(`Example app listening on port http//:localhost:${port}`)
})