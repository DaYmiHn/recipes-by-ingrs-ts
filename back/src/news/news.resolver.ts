import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NewsService } from './news.service' 

@Resolver()
export class NewsResolver {
  constructor(
    private newsService:NewsService
  ){}
  // {
  //   newses {
  //     id
  //     title
  //     body
  //   }
  // }
  @Query()
  newses(){
    return this.newsService.getAllLaunches()

  }




  // {
  //   news(id:5) {
  //     id
  //     title
  //     body
  //   }
  // }
  @Query()
  news(@Args('id') id:number){
    console.log(id)
    return this.newsService.getLaunchById(id)
  }



  // mutation {
  //   createNews(input: {
  //     title: "andy",
  //     body: "hope is a good thing",
  //   }) {
  //     id
  //     title
  //   }
  // }
  @Mutation()
  async createNews(@Args('input') input: object) {
    return this.newsService.create(input);
  }
}
