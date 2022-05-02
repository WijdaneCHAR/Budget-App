import React , {useState , useRef , useEffect }from 'react'
import { Button , Form ,MoneyDiv,Input, Checkbox, Reset}from '../Styling';
export default function () {
    const [description,setDescription] = useState();
    const [income,setIncome] = useState(0);
    const [expense,setExpense] = useState(0);
    const [err,setErr] = useState(false);

    const prevIncome = useRef();
    const prevExpense = useRef();
    useEffect(() => {
        prevIncome.current = Number(income);
        prevExpense.current = Number(expense)
      }, [income,expense]); 

  const add = (e) => {
    e.preventDefault();
    setDescription(e.target.elements.description.value)
    if(e.target.elements.incomeType.checked) setIncome(prevIncome.current + Number(e.target.elements.amount.value));
    else if(e.target.elements.expenseType.checked)  setExpense(prevExpense.current + Number(e.target.elements.amount.value)); 
    else setErr(true);
    e.target.elements.amount.value ="";
    e.target.elements.description.value ="";
    e.target.elements.incomeType.checked = false;
    e.target.elements.expenseType.checked = false;
  }
  const reset = () =>{
    setIncome(0);
    setExpense(0);
    setErr(false);
  }
  return (
    <div>
        <MoneyDiv>
            <div><h5>Money Earned : </h5>{income} $</div>
            <div><h5>Money Available : </h5>{income-expense} $</div>
            <div><h5>Money Spent : </h5>{expense} $</div> 
            <Reset onClick={reset}>Reset values</Reset>
        </MoneyDiv>
       
        <Form onSubmit={add}>
          <div style={{display:"flex",flexdirection:"column"}}>
            <Input style={{width:"70%"}} type="text" placeholder='Description' name='description' ></Input>
            <Input style={{width:"20%"}}type="text" placeholder='Amount' name='amount' required></Input>
            </div>
        <Checkbox>
            <div>
              <input type="checkbox"   name='incomeType' ></input> 
              <label>check if it's an income</label>
            </div>
            <div>
              <input type="checkbox"   name='expenseType' ></input> 
              <label>check if it's an expense</label>
            </div>
            {err && <p style={{color:"red"}}>Check an amount type !!</p>}
          </Checkbox>
          
            <Button type="submit" >Add</Button>
        </Form>
    </div>
  )
}
