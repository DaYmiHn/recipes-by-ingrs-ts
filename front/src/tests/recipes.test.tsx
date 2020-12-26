import recipes from '../reducers/recipes'
test('RESET_RECIPES', ()=>{
  const initialState:any = [
    {
      title:'test'
    }
  ]
  const newState = recipes(initialState, {recipes:[{title:'test'}], type:'RESET_RECIPES'})
  expect(newState.length).toBe(0)
})


test('LOAD_RECIPES', ()=>{
  const initialState:any = [
    {
      title:'test'
    }
  ]
  const newState:any = recipes(initialState, {recipes:[{title:'test123'}], type:'LOAD_RECIPES'})
  expect(newState.length).toBe(2)
  expect(newState[1].title).toBe('test123')
})