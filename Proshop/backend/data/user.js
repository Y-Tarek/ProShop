const bcrypt = require('bcryptjs');
const users = [
    {
        name:'Admin user',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456',12),
        isAdmin:true
    },
    {
        name:'Yasser Tarek',
        email:'yasser98@example.com',
        password: bcrypt.hashSync('123456',12),
        
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password: bcrypt.hashSync('123456',12),
        
    }

];

module.exports = {users};