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
  
  async getAllRecipesForUser(id: string) {
    // let user = await this.usersService.findOne({_id:id});
    // console.log(user);

    let ingrs = await (await this.usersService.findOne({_id:id})).ingredients
    
    let cond_or_query = [];
    ingrs.forEach(element => {
      cond_or_query.push({ "$eq": [ "$ingredients", element ] })
    });
    const query= [
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
      { "$match": { "size" :  {"$gt" : 6 }} },
      { "$addFields": { "match": {  "$subtract": ["$size", "$order"] } } },

      { "$sort": { "match":1, "size":-1} }
    ];
    // if(req.query.category)
    //   query.unshift({ "$match": { "category":  req.query.category  } })
    // await app.service('recipe').Model.aggregate(query).skip(parseInt(req.params.page-1)*50).limit(50).toArray().then((recipes)=> {
    //   // res.send( recipes.sort(() => Math.random() - 0.5) ) 
    //   res.send( recipes ) 
    // }).catch((err)=>console.log(err))
    return await this.recipeModel.aggregate(query).limit(100)
  }
}
