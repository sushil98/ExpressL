const express = require('express');
const router = express.Router();
const members = require('../../Member');
const uuid = require('uuid')
// app.get('/',(req,res)=>{
//     // res.send('hello world !')
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

router.get('/', (req, res) => {
    res.json(members)
})

//specific member by id
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json(members.filter(member => {
            return member.id === parseInt(req.params.id)
        }))
    }
    else {
        res.status(400).json({
            msg: 'no found'
        })
        //res.send("no record exist for the  id "+req.params.id)
    }


    //res.send(req.params.id)
});

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name||!newMember.email){
      return  res.status(400).json({
            msg:"please include name and email"
        })
    }
    members.push(newMember);
    res.json(members)
    //res.send(req.body)

});

//update
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
      const updMember=req.body;
      members.forEach(member=>{
          if(member.id===parseInt(req.params.id)){
            member.name=updMember.name?updMember.name:member.name;
            member.email=updMember.email?updMember.email:member.email;
         res.json({
             msg:'member updated',member
         })
        }
      })
    }
    else {
        res.status(400).json({
            msg: 'no found'
        })
        //res.send("no record exist for the  id "+req.params.id)
    }


    //res.send(req.params.id)
});

//delete
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
   res.json({msg:'deleted success',member:members.filter(member=>{
       return member.id!==parseInt(req.params.id)
   })})
    }
    else {
        res.status(400).json({
            msg: 'no found'
        })
        //res.send("no record exist for the  id "+req.params.id)
    }


    //res.send(req.params.id)
});



module.exports = router