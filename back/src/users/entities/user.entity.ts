import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
  
  @Prop()
  avatal: string;
  
  @Prop()
  ingredients: string[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
