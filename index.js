const express=require('express');
const path=require('path');
const  exphbs=require('express-handlebars');
//const logger=require('./middleware/logger')

const app=express();
app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
app.use('/api/members',require('./routes/api/membersRoutes'))
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log('server stared on'+PORT)
});