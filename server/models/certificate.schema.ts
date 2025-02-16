import mongoose from 'mongoose'

const { Schema } = mongoose

export const CertificateSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  img: {
    type: String
  },
  url: {
    type: String
  },
  order: {
    type: Number
  }
})
