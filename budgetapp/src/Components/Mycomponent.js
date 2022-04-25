import React , {useState} from 'react'
import { Button , Form ,MoneyDiv,Input}from '../Styling';
export default function () {
    var [description,setDescription] = useState();
    var [balance,setBalance] = useState(0); 
    var [income,setIncome] = useState(0);
    var [expense,setExpense] = useState(0);
    var [err,setErr] = useState(false);

  var add = (e) => {
    e.preventDefault();
    setDescription(e.target.elements.description.value)
    e.target.elements.type.checked ?   setIncome(e.target.elements.amount.value) : setExpense(e.target.elements.amount.value); 
    setBalance(income - expense);
    
    e.target.elements.amount.value ="";
    e.target.elements.description.value ="";
  }
  
 
  return (
    <div>
        <MoneyDiv>
            <div><h5>Money Earned : </h5>{income} $</div>
            <div><h5>Money Available : </h5>{income-expense} $</div>
            <div><h5>Money Spent : </h5>{expense} $</div>
        </MoneyDiv>

        <Form onSubmit={add}>
          <div style={{display:"flex",flexdirection:"column"}}>
            <Input style={{width:"70%"}} type="text" placeholder='Description' name='description' ></Input>
            <Input style={{width:"20%"}}type="text" placeholder='Amount' name='amount' required></Input>
            </div>
            <div><input type="checkbox"   name='type' ></input> 
            <label>check if its an earned money</label>
            </div>
            <Button type="submit" >Add</Button>
        </Form>
    </div>
  )
}
