import { defineMongooseModel } from '#nuxt/mongoose'
import { SkillSchema } from './SkillSchema.schema'

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
    },
    backend: {
      type: [SkillSchema]
    },
    frontend: {
      type: [SkillSchema]
    },
    graphicDesign: {
      type: [SkillSchema]
    },
    others: {
      type: [SkillSchema]
    }
  },
  options: {
    collection: 'profiledatas'
  }
})
