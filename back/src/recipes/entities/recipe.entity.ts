import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop()
  title: string;

  @Prop()
  ingredients: string[];

  @Prop()
  category: string;
  
  @Prop()
  url: string;

}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
