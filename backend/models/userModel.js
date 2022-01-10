import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

//bcrypt compare wachtwoord met hetgene in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
//voor een user wordt aangemaakt, een hash wordt gemaakt van de password
userSchema.pre('save', async function (next) {
  //bij update, is het niet veranderd, doe niets
  if (!this.isModified('password')) {
    next()
  }
  //voor het model wordt opgeslagen, genereer een hash voor de user
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
