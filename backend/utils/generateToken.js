import jwt from 'jsonwebtoken'

//Genereert een token voor de user bij authenticatie gebasseerd op de meegegeven id van de user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateToken
