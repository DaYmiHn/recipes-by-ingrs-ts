import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './entities/recipe.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}


  create(createRecipeDto: CreateRecipeDto) {
    const createdCat = new this.recipeModel(createRecipeDto);
    return createdCat.save();

  }

  findAll() {
    return this.recipeModel.find().limit(1);
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto) {
    this.recipeModel.findByIdAndUpdate(id, updateRecipeDto);
    return  updateRecipeDto;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
