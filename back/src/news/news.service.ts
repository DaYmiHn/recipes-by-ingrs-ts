import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com'

  constructor(
    private http: HttpService
  ){}

  toNews(news:any){
    return {
      id: news.id,
      title: news.title,
      body: news.body,
      userId: news.userId
    }
  }
  getAllLaunches(){
    console.log(this.http.get(`${this.apiUrl}/posts`))
    return this.http.get(`${this.apiUrl}/posts`).pipe(map(({data}) => data.map(this.toNews)))
  }
  
  getLaunchById(id: number){
    return this.http.get(`${this.apiUrl}/posts/${id}`).pipe(map(({data}) => data))
  }
  
  
  create(news: any){
    console.log(news)
    return {
      ...news,
      id: Math.round(Math.random()*10),
      title:'created'
    }
  }


}
