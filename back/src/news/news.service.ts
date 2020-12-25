import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  private apiUrl = 'https://api.spacexdata.com/v3'

  constructor(
    private http: HttpService
  ){}

  getAllLaunches(){
    return this.http.get(`${this.apiUrl}/launches`)
  }
  
  getLaunchById(id: number){
    // return this.http.get(`${this.apiUrl}/launches/${id}`)
    return {
      id:'1232312312',
      fdfdf:'1232312312',
    }
  }


}
