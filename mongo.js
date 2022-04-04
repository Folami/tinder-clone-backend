import mongoose from 'mongoose';

const newCard = process.argv[2]
const picUpload = process.argv[3]

const connectionUrl = `mongodb+srv://admin:mongodb@cluster0.qtndx.mongodb.net/tinderCloneDB?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl)

const cardSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
})  

const Card = mongoose.model('Card', cardSchema)

if (newCard) {
    const card = new Card({
        name: newCard,
        imgUrl: picUpload,
    })
    card.save().then(result => {
        console.log('Card saved!')
        console.log('added ', `${card.name}`, ' to Cards')
    })
}

Card.find({}).then(result => {
    result.forEach(card => {
      console.log(card)
    })
    mongoose.connection.close()
})
