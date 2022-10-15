import { Schema, SchemaTypes, type InferSchemaType } from 'mongoose';

export const UserSchemaName = 'User';

export const UserSchema = new Schema(
  {
    uid: {
      type: SchemaTypes.String,
    },
    password: {
      type: SchemaTypes.String,
    },
    first_name: {
      type: SchemaTypes.String,
    },
    last_name: {
      type: SchemaTypes.String,
    },
    username: {
      // unique: true,
      type: SchemaTypes.String,
    },
    gender: {
      type: SchemaTypes.String,
    },
    phone_number: {
      type: SchemaTypes.String,
    },
    social_insurance_number: {
      type: SchemaTypes.String,
    },
    avatar: {
      type: SchemaTypes.String,
    },
    date_of_birth: {
      type: SchemaTypes.Date,
    },
    email: {
      // unique: true,
      type: SchemaTypes.String,
    },
    employment: {
      type: {
        title: SchemaTypes.String,
        key_skill: SchemaTypes.String,
      },
    },
    credit_card: {
      type: {
        ballance: { type: SchemaTypes.Number, default: 0 },
        cc_number: { type: SchemaTypes.String, default: '' },
      },
      default: {
        ballance: 0,
        cc_number: '',
      },
    },
    address: {
      type: {
        coordinates: { lng: SchemaTypes.Number, lat: SchemaTypes.Number },
        country: SchemaTypes.String,
        state: SchemaTypes.String,
        street_address: SchemaTypes.String,
        street_name: SchemaTypes.String,
        zip_code: SchemaTypes.String,
      },
    },
    deleted: {
      type: SchemaTypes.Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export type IUser = InferSchemaType<typeof UserSchema>;
