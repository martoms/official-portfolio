import mongoose from 'mongoose'

const { Schema } = mongoose

export const SkillSchema = new Schema({
  name: {
    type: String
  },
  img: {
    type: String
  },
  order: {
    type: Number
  }
})
