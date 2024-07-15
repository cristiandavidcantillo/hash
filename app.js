const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.post('/login', async(req, res)=>{

    //datos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;

    //se validan sin son datos correctos

    if(user == 'admin' && password == '12345'){

        //encriptación de la contraseña, (await = asincrona)
        let passwordHash = await bcryptjs.hash(password, 10);

        res.json({
            message:'autentificación exitosa',
            passwordHash: passwordHash
        })
    }else{
        res.json({
            message:'ingrese bien las credenciales'
        })
    }
});


//comparación de contraseñas
app.get('/compare', (req, res)=>{                                                                                   
    let hashSaved = '$2a$10$/wURuqM.s6A8t9hHnl3xZe2t3VGK35fPa5HrqJcN.7Y2XsOSxsb5S';
    let compare = bcryptjs.compareSync('12345', hashSaved);
    if(compare){
        res.json('OK')
    }else{
        res.json('no son iguales')
    }
})



app.listen(3000, ()=>{
    console.log('servidor corriendo');
})

