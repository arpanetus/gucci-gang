import dotenv from "dotenv"
import mutations from "seed/seed-mutations"
import fs from 'fs'

dotenv.config()

fs.writeFile('public/seed-mutations.graphql', mutations, function (err) {
  if (err) return console.log(err)
})
