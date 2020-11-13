const mongoose = require('mongoose')
const Data = require('./models/data')
const User = require('./models/user')

mongoose.connect(
  'mongodb://localhost/seeded',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) return console.log(err)

    console.log('Mongoose connected')
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create([
          {
            name: 'admin',
            userName: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            passwordConfirmation: 'admin',
            postcode: '0',
            badges: [],
            isAdmin: true
          }
        ])
      })

      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })

      .then((users) => {
        return Data.create([
          {
            image: 'https://bs.floristic.org/image/o/1abc01027d5c9b6fb586da94752149d468c88554',
            commonName: 'Barrel cactus',
            scientificName: 'Kroenleinia grusonii',
            careNotes: 'Water once a month. Keep in sunlight',
            outdoor: false,
            user: users[0]
          },
          { 
            image: 'https://bs.floristic.org/image/o/0f3f31fd38dbf8668fc19dd0ca60aab1793bf925',
            commonName: 'Garden Tomato',
            scientificName: 'Solanum lycopersicum',
            careNotes: 'Somewhere sunny',
            outdoor: true,
            user: users[0]
          },
          {
            commonName: 'French hydrangea',
            scientificName: 'Hydrangea macrophylla',
            image: 'https://bs.floristic.org/image/o/91f52328edb009bb771ff1e1d865fae14d80ec3b',
            careNotes: 'Water often, keep out of sunlight.',
            outdoor: false,
            user: users[0]
          }
        ])
      })

      .then(Data => {
        console.log(`${Data.length} plants have been created`)
      })
      .catch(err => console.log(err))
      .finally(() => {
        mongoose.connection.close()
      })
  } 
)