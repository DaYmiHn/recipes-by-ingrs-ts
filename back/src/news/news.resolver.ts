import { Resolver, Query, Args } from '@nestjs/graphql';
import { NewsService } from './news.service' 

@Resolver()
export class NewsResolver {
  constructor(
    private newsService:NewsService
  ){}

  @Query()
  newses(){}

  @Query()
  news(@Args('id') id:number){
    console.log(id)
    return this.newsService.getLaunchById(id)
  }

  // @Query()
  // article(@Args('id') id:number){
  //   console.log(id)
  //   return this.newsService.getLaunchById(id)
  // }
}
