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
  
  async getAllRecipesForUser(id: string, {filter}:any) {
    // console.log(filter)
    const filters:any = JSON.parse(filter);
    console.log(filters)
    let ingrs = await (await this.usersService.findOne({_id:id})).ingredients
    
    let cond_or_query = [];
    ingrs.forEach(element => {
      cond_or_query.push({ "$eq": [ "$ingredients", element ] })
    });
    const query:any = [
      { "$match": { "ingredients": { "$in": ingrs } } },
      { "$unwind": "$ingredients" },
      { "$group": {
        "_id": "$_id",
        "title": { "$first": "$title" },
        "url": { "$first": "$url" },
        "ingredients": { "$push": "$ingredients" },
        "order": {
          "$sum": { 
            "$cond": [{
              "$or": cond_or_query
            },
            1,
            0
          ]}
        },
        "size": {"$sum":1}
      }},
      { "$addFields": { "match": {  "$subtract": ["$size", "$order"] } } },

      { "$sort": { "match":1, "size":-1} }
    ];
    if(filters.count_ingr)
      query.push({ "$match": { "size":  +filters.count_ingr  } })
    if(filters.miss_ingr)
      query.push({ "$match": { "match":  +filters.miss_ingr  } })
    if(filters.picture == "true")
      query.unshift({ "$match": { "image": { '$exists' : true } } })
    if(filters.category)
      query.unshift({ "$match": { "category":  filters.category  } })
    if(!filters.count_ingr && !filters.miss_ingr && !filters.picture && !filters.category)
      query.push({ "$match": { "size" :  {"$gt" : 6 }} })
    console.log(query)
    return await this.recipeModel.aggregate(query).skip((filters.page)*50).limit(50)
  }
}
