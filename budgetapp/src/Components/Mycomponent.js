import React , {useState , useRef , useEffect }from 'react'
import { Button , Form ,MoneyDiv,Input, Checkbox, Reset, Ul, Li, Remove}from '../Styling';
export default function () {
  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }
    const [couple,setCouple] = useLocalStorage("couple",{})
    const [income,setIncome] = useLocalStorage("income",0);
    const [expense,setExpense] = useLocalStorage("expense",0);
    const [err,setErr] = useState(false);

    const prevIncome = useRef();
    const prevExpense = useRef();

    useEffect(() => {
        prevIncome.current = Number(income);
        prevExpense.current = Number(expense);
      }, [income,expense]); 
  const add = (e) => {
    e.preventDefault();
    const newCouple = {};
    newCouple[e.target.elements.amount.value] = e.target.elements.description.value; 
    setCouple(Object.assign({}, couple, newCouple));
    if(e.target.elements.incomeType.checked)
      setIncome(prevIncome.current + Number(e.target.elements.amount.value));
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

  const clear = () =>{
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
            <Input style={{width:"70%"}} type="text" placeholder='Description' name='description'onFocus={clear} required></Input>
            <Input style={{width:"20%"}}type="text" placeholder='Amount' name='amount' onFocus={clear} required></Input>
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
        <div style={{margin:"0 15px"}}>
          <h1>History :</h1>
          <hr></hr>
          <Ul>
      {Object.keys(couple).map(key => {
        return <Li key={key}>
            <p style={{width:"80%"}}>{couple[key]} </p>
            <p style={{width:"20%"}} >{key} $ </p>
            {/* <p><Remove onClick={(key)=> {
                delete couple[key];
                setCouple(couple);
            }}>remove</Remove></p> */}
               </Li> 
      })}
          </Ul>
        </div>
    </div>
  )
}
