const { default: mongoose } = require('mongoose')

mongoose.connect("mongodb+srv://khushhalkhan335:doctor123@cluster1.llnj4x6.mongodb.net/testdb")
.then(() => {
    console.log("mongo connected")
})
.catch(() => {
    console.log('failed')
})
