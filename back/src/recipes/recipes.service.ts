import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './entities/recipe.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';


@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    private usersService: UsersService,
    ) {}


  create(createRecipeDto: CreateRecipeDto) {
    const createdCat = new this.recipeModel(createRecipeDto);
    return createdCat.save();

  }

  findAll() {
    return this.recipeModel.find();
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
  
  getAllRecipesForUser(id: string) {
    let user = this.usersService.findOne({_id:id})
    return `This action removes a #${user} recipe`;
  }
}
