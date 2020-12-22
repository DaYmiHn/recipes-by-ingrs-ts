import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient, IngredientDocument } from './entities/ingredient.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IngredientService {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<IngredientDocument>){}
  async create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  async findAll(limit:number|null) {
    return await this.ingredientModel.find({}).limit(limit||0);
  }

  async findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  async remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }

  async findByPart(part: string) {
    return await this.ingredientModel.find( { title: { "$regex": part, "$options": "i" } }, ).limit(100);
  }
}
