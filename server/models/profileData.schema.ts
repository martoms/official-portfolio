import { defineMongooseModel } from '#nuxt/mongoose'
import { SkillSchema } from './skill.schema'
import { CertificateSchema } from './certificate.schema'

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
    start: {
      type: Number
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
    },
    certificates: {
      type: [CertificateSchema]
    }
  },
  options: {
    collection: 'profiledatas'
  }
})
