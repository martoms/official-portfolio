import { defineMongooseModel } from '#nuxt/mongoose'

export const GeneralSchema = defineMongooseModel({
  name: 'GeneralData',
  schema: {
    domain: {
      type: String,
      required: true
    },
    credentials: {
      username: {
        type: String
      },
      password: {
        type: String
      }
    }
  },
  options: {
    collection: 'general'
  }
})
