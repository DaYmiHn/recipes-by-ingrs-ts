import React, { Component } from 'react';
import Loader from '../../components/loader';
import axiosService from '../../components/axios';

declare const window: any;

interface IProps {
  profile: any
}

interface IState {
  recipes: object[],
  loading: Boolean,
  page: number,
  category: string | null,
}

export default class Recipes extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      page: 0,
      category: null
    };
  }
  componentDidMount(){
    window.addEventListener('scroll', ()=>this.loadMore(this));
    console.log('componentDidMount')
    this.loadMore(this)
  }

  componentWillMount(){
    window.addEventListener('scroll', async ()=> {if(!this.state.loading || this.state.page === 0)await this.loadMore(this)});
  }
  
  componentWillUnmount(){
      window.removeEventListener('scroll', this.loadMore(this));
  }

  loadData(){
    let filter = '?';
    if(this.state.category)
      filter += `category=${this.state.category}`
      axiosService.get(`/recipes/getAllRecipesForUser/${this.props.profile.id}`,{
        params:{
          filter,
          page: this.state.page
        }
      }).then(({data})=>{
        console.log(data)
        this.setState({recipes: [
          ...this.state.recipes,
          ...data,
        ] });
        // console.log(this.state.recipes.length)
        this.setState({ loading: false });
        window.M.AutoInit()
        console.log(`page - ${this.state.page}, state - ${this.state.recipes.length}`)
    });
  }


  async loadMore(that:any){
    await that.setState({ loading: true });
    // console.log(this)
    if (window.document.scrollingElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) <= 1 ) {
      await that.setState( {page : this.state.page + 1});
      
      
      // console.log(this.state.filter.page)
      await that.loadData()
      await that.setState({ loading: false });
    } else {
      await that.setState({ loading: false });
    }
  }
  getCountMissIngr(order:any,size:any){
    let perc = order/size*100
    // console.log(perc)
    if (perc == 100 )
      return "#26a69a"
    else if (perc > 40 && perc <100)
      return "orange"
    else 
      return "red"   
  }

  formatIngrsList(recipe:any){
    let res = '<ul>';
    recipe.ingredients.forEach((el:any)=>{
      res += `<li>${el}</li>`
    })
    res += '</ul>'
    return res
  }
  
  
  render() {
    return (
      <div className="recipes-page">
        <div className="row card" style={{ position: "sticky", top: "0", zIndex: 999, marginBottom: "0", marginTop: "0"}}>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select defaultValue=''>
              <option value="" disabled >Кол-во ингр.</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select defaultValue=''>
              <option value="" disabled >Недостаёт ингр.</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select defaultValue=''>
              <option value="" disabled >Картинка</option>
              <option value="true">есть</option>
              <option value="false">нет</option>
            </select>
          </div>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select onChange={(event)=>{ this.setState( {category : event.target.value}, () => {
                                            this.setState( {recipes : []}, ()=>{ this.loadData()})
                                        });}} defaultValue=''>
              <option value="" >Категория</option>
              <option value="блины, оладьи, сырники">блины, оладьи, сырники</option>
              <option value="бутерброды">бутерброды</option>
              <option value="выпечка и десерты2">выпечка и десерты</option>
              <option value="домашние заготовки">домашние заготовки</option>
              <option value="закуски">закуски</option>
              <option value="запеканки">запеканки</option>
              <option value="каши">каши</option>
              <option value="напитки">напитки</option>
              <option value="основные блюда">основные блюда</option>
              <option value="пельмени и вареники">пельмени и вареники</option>
              <option value="салаты и винегреты">салаты и винегреты</option>
              <option value="соусы и заправки">соусы и заправки</option>
              <option value="супы и бульоны">супы и бульоны</option>
              <option value="хлеб">хлеб</option>
              <option value="шашлык">шашлык</option>

              <option value="ризотто">ризотто</option>
              <option value="завтраки">завтраки</option>
            </select>
          </div>
        </div>


        <div className='row z-depth-3' style={{padding:'10px'}} >
          { this.state.loading == true &&  <Loader/>}
          { this.state.recipes !== undefined && 
            this.state.recipes.map((value:any, index) => { 
              return (
              <div key={index} className="col s6 m4 l3" >
                  <div className="card small " style={{borderRadius:"0px"}}>
                  <a href={value.url}>
                    <div className="card-image" style={{ maxHeight: "84%"}}>
                      <img src="https://image.freepik.com/free-vector/cute-dog-with-toys-and-food-kawaii-background_6997-1675.jpg"/>
                      <img src="https://image.freepik.com/free-vector/cute-dog-with-toys-and-food-kawaii-background_6997-1675.jpg"/>
                      <span className="card-title" style={{backgroundColor: "#000000b5", "paddingTop": "5px", width: "100%"}}>{value.title}</span>
                    </div>
                  </a>
                  <div className="card-action" style={{paddingLeft:'10px', paddingRight:'10px'}} >
                    <span  data-position="top" data-tooltip={this.formatIngrsList(value)} style={{backgroundColor: this.getCountMissIngr(value.order,value.size)}} className="new badge tooltipped" data-badge-caption="">{value.order} из {value.size} есть</span>
                    {/* <a href={value.url}>Открыть */}
                  </div>
                </div>
              </div>
              )
          })}
        </div>
      </div>
  
  );
  }
}
