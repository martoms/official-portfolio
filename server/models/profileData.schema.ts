import { defineMongooseModel } from '#nuxt/mongoose'
import { current } from 'tailwindcss/colors'

export const ProfileDataSchema = defineMongooseModel({
  name: 'ProfileData',
  schema: {
    section: {
      type: String,
      required: true
    },
    img: {
      type: String
    },
    name: {
      type: String
    },
    currentPosition: {
      type: String
    },
    currentCompany: {
      type: String
    },
    cv: {
      type: String
    },
    intro: {
      type: String
    }
  },
  options: {
    collection: 'profiledatas'
  }
})
