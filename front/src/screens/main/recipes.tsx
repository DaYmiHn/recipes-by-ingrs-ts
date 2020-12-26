import React, { Component } from 'react';
import Loader from '../../components/loader';
import axiosService from '../../components/axios';
import {connect} from 'react-redux';
import { loadRecipes, changeFilter, resetRecipes } from '../../actions/actionCreator'
import store  from '../../store/'

let { filter, recipes} = store.getState();
declare const window: any;

interface IProps {
  profile?: any,
  loadRecipes?:any,
  changeFilter?:any,
  resetRecipes?:any,
  recipes?:any
}

interface IState {
  recipes: object[],
  loading: Boolean,
  category: string | null,
}

class Recipes extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      category: null
    };
  }
  componentDidMount(){
    window.addEventListener('scroll', this.scrollListener);
    this.loadMore(this)
  }

  componentWillMount(){
    this.setFilterAndUpdate({page:0})
  }
  
  componentWillUnmount(){
    window.removeEventListener('scroll',  this.scrollListener);
  }


  scrollListener = () => {
    if(!this.state.loading)
      this.loadMore(this)
  }


  loadData( page?:number){
      axiosService.get(`/recipes/getAllRecipesForUser/${this.props.profile.id}`,{
        params:{
          filter: {
            ...store.getState().filter,
            page
          },
        }
      }).then(({data})=>{
        this.props.loadRecipes(data)
        this.setState({ loading: false });
        window.M.AutoInit()
        const state:object[] = store.getState().recipes
        console.log(`page - ${store.getState().filter.page}, state - ${state.length}`)
    });
  }





  async loadMore(that:any){
    await that.setState({ loading: true });
    if (window.document.scrollingElement.scrollHeight - (window.innerHeight + document.documentElement.scrollTop) <= 1 ) {
      await that.loadData(store.getState().filter.page)
      this.props.changeFilter({page: store.getState().filter.page+1})
      await that.setState({ loading: false });
    } else {
      await that.setState({ loading: false });
    }
  }



  public getCountMissIngr(order:any,size:any){
    let perc = order/size*100
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
  

  setFilterAndUpdate(filter:any){
    const { changeFilter, resetRecipes } = this.props;
    changeFilter(filter); 
    resetRecipes()
    this.loadData(0)
  }
  
  render() {
    const {recipes}:any = store.getState();
    
    
    return (
      <div className="recipes-page">
        <div className="row card" style={{ position: "sticky", top: "0", zIndex: 990, marginBottom: "0", marginTop: "0"}}>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select defaultValue=''  onChange={(event)=>{this.setFilterAndUpdate({count_ingr:event.target.value})}}>
              <option value="" >Кол-во ингр.</option>
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
            <select defaultValue=''  onChange={(event)=>{this.setFilterAndUpdate({miss_ingr:event.target.value})}}>
              <option value="" >Недостаёт ингр.</option>
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
            <select defaultValue=''  onChange={(event)=>{this.setFilterAndUpdate({picture:event.target.value})}} >
              <option value="" >Картинка</option>
              <option value="true">есть</option>
              <option value="false">нет</option>
            </select>
          </div>
          <div className="input-field col s6 l3" style={{margin:"0"}}>
            <select defaultValue='' onChange={(event)=>{this.setFilterAndUpdate({category:event.target.value})}}>
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
          { recipes !== undefined && 
            recipes.map((value:any, index:number) => { 
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
                    <a href={value.url}>Открыть</a>
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
const mapStateToProps = (state:any) => {
  return {
    recipes: state.recipes,
    filter: state.filter,
  }
}

export default connect((mapStateToProps), {loadRecipes, changeFilter, resetRecipes})(Recipes);
