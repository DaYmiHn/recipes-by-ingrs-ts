import React, { Component } from 'react';
import axiosService from '../../components/axios';
import {connect} from 'react-redux';

interface IProps {
  profile: any,
  user: any
}

interface IState {
  myIngredients: object[],
  searchedIngredients: object[],
}

export class Ingredients extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      myIngredients: [],
      searchedIngredients: []
    };
  }
  async componentDidMount(){
    this.getData();
    await axiosService.get('/ingredients',{
      params:{
        limit: 100
      }
    }).then(({data})=>{
      console.log(data)
      if(data !== [])
        this.setState({searchedIngredients:data})
    });
  }

  async getData(){
    console.log('getData')
    console.log(this.props.user)
    await axiosService.get(`/users/${this.props.user.id}`).then(async ({data})=>{
      console.log('data',data)
      this.setState({myIngredients: data?.ingredients || []})
      console.log(this.state.myIngredients)
    });
  }
  
  async addIngredient(ingr:any){
    await axiosService.get(`/users/${this.props.user.id}`).then(async ({data})=>{
      if (this.state.myIngredients.length){
        if(!this.state.myIngredients.includes(ingr)) {
          console.log(data.ingredients);
          if(data.ingredients)
            data.ingredients.push(ingr)
          else
            data.ingredients = [ingr]
          await axiosService.put(`/users/${this.props.user.id}`,{
            ...data,
            ingredients: data.ingredients
          }).then(()=>this.getData())
        } else {
          window.alert('Уже в холодильнике')
        }
      } else {
        await axiosService.put(`/users/${this.props.user.id}`,{
          ...data,
          ingredients: [ingr]
        }).then(()=>this.getData())
      }
    });
    
  }

  async removeIngredient(ingr:any){
    await axiosService.get(`/users/${this.props.user.id}`).then(async ({data})=>{
      if (data.ingredients.indexOf(ingr) > -1) {
        data.ingredients.splice(data.ingredients.indexOf(ingr), 1);
      }
      await axiosService.put(`/users/${this.props.user.id}`,{
        ...data
      }).then(()=>this.getData())
    });

    
  }
  
  async getQueringResult(str:string){
    if(!str){
      this.getData()
      return false
    }
    console.log(str)
    await axiosService.get('/ingredients/findByPart/'+str).then(({data})=>{
      if(data !== [])
        this.setState({searchedIngredients:data})
    });
  }

  render() {
    return <div className='row z-depth-2' >
    <div className='col m4 s12 card' style={{padding : "0 10px!important", margin: '0px'}}>  
      <div className="row" style={{marginBottom: '0px', marginTop: '30px' }}>
        <div className="input-field">
          <input id="ingredient_typing" type="text" className="validate"  onChange={(e)=>this.getQueringResult(e.target.value)}/>
          <label htmlFor="ingredient_typing" style={{marginLeft: "10px"}}>Введите ингредиент</label>
        </div>
      </div>
      <div className="row" style={{maxHeight:'500px', overflow: 'auto'}}>
        <ul className="collection">
        { this.state.searchedIngredients && 
          this.state.searchedIngredients.map((value:any, index) => {
            var color = this.state.myIngredients.includes(value.title) ? '#cecece': '#fff';
          
          return <li key={index} style={{cursor:'pointer', marginBottom: '1px', backgroundColor: color}} className="collection-item hoverable" onClick={()=>this.addIngredient(value.title)}>{value.title}</li>
        })}
        </ul>
      </div>
    </div>
     

    <div className='col m8 s12'>
      <h4>Ваши ингредиенты</h4>
      <p>Для удаления можно просто нажать</p>
      { this.state.myIngredients && 
        this.state.myIngredients.map((value, index) => {
        return <button key={index} className="waves-effect waves-light btn" style={{margin: '0 5px 5px 0'}} onClick={()=>this.removeIngredient(value)}>{value}</button>
      })}
    </div>
  </div>; 
  }
}

const mapStateToProps = (state:any) => {
  return {
    tasks: state.tasks,
    filters: state.filters,
    user: state.user,
  }
}
export default connect((mapStateToProps), {})(Ingredients);