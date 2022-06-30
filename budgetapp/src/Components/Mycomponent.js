import React , {useState , useRef , useEffect }from 'react'
import { Button , Form ,MoneyDiv,Input, Checkbox, Reset, Ul, Li, Remove, Description,Amounts, DivScroll}from '../Styling'
import swal from 'sweetalert' 
function Mycomponent() {
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

    const prevIncome = useRef();
    const prevExpense = useRef();

    useEffect(() => {
        prevIncome.current = Number(income);
        prevExpense.current = Number(expense);
      }, [income,expense]); 
  const add = (e) => {
    e.preventDefault();
    const newCouple = {};
    console.log(isNaN(Number(e.target.elements.amount.value)))
    if(isNaN(Number(e.target.elements.amount.value))){
      swal({
        text:"The amount should be a number ...",
        buttons:false,
        icon:'error',
        timer:1000
      })
    }else{
       if(e.target.elements.incomeType.checked){
      newCouple[e.target.elements.amount.value] = e.target.elements.description.value; 
      setCouple(Object.assign({}, couple, newCouple));
      setIncome(prevIncome.current + Number(e.target.elements.amount.value));
    }
    else if(e.target.elements.expenseType.checked){
      newCouple[e.target.elements.amount.value] = e.target.elements.description.value; 
      setCouple(Object.assign({}, couple, newCouple));
      setExpense(prevExpense.current + Number(e.target.elements.amount.value)); 
    } 
    else {
      swal({
        text:"Check an amount type to continue ...",
        buttons:false,
        icon:'error',
        timer:2000
      })
    };
    }
   
    e.target.elements.amount.value ="";
    e.target.elements.description.value ="";
    e.target.elements.incomeType.checked = false;
    e.target.elements.expenseType.checked = false;
  }

  const reset = () =>{
    setIncome(0);
    setExpense(0);
  }


  return (
    <div style={{backgroundColor:"#EEEEEE",paddingBottom: "100px"}}>
        <MoneyDiv>
            <div><p>Money Available : </p><h1 style={{fontSize:"45px"}}>$ {income-expense}</h1></div>
            <div style={{display:"flex",flexDirection:"row",textAlign:"center"}}>
              <div style={{width:"50%",color:"#395A86",}}>
                <DivScroll style={{backgroundColor:"#ffffff",width:"120px",borderRadius:"20px",padding:"5px 10%",float:"right",overflow:"scroll"}}>
                  <p>Money Earned : </p><h1 style={{color:"green"}}>${income}</h1>
                </DivScroll>
                </div>
              <div style={{width:"50%",color:"#395A86",marginLeft:"3%"}}>
                <DivScroll style={{backgroundColor:"#ffffff",width:"120px",borderRadius:"20px",padding:"5px 10%",float:"left",overflow:"scroll"}}>
                    <p>Money Spent : </p><h1 style={{color:"red"}}>${expense}</h1>
                </DivScroll>         
                </div> 
            </div>
            <Reset onClick={reset}>Reset values</Reset>
        </MoneyDiv>
       
        <Form onSubmit={add}>
            <Input style={{width:"40%"}} type="text" placeholder='Where did I waste my money or did come from' name='description' required></Input>
            <Input  style={{width:"20%"}}  type="text" placeholder='Amount' name='amount' required></Input>

        <Checkbox>
            <div style={{margin:"5px 0"}}>
              <input type="checkbox"   name='incomeType' style={{cursor:"pointer"}}></input> 
              <label>check if it's an income</label>
            </div>
            <div style={{margin:"5px 0"}}>
              <input type="checkbox"   name='expenseType' style={{cursor:"pointer"}}></input> 
              <label>check if it's an expense</label>
            </div>
          </Checkbox>
            <Button type="submit" >Add</Button>
        </Form>
        <div style={{margin:"0 15%"}}>
          <h1>History :</h1>
          <hr></hr>
          <Ul>
            <Remove onClick={()=> {
              var count = 0;
              for(var i in couple){
                if(couple.hasOwnProperty(i)) count++;
              }
              if(count !== 0){
                 swal({
                    title: "Are you sure to remove all the transactions?",
                    text: "Once deleted, you will not be able to recover the transactions",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      setCouple({});
                      swal("All transactions deleted!", {
                        icon: "success",
                        buttons:false
                      });
                    } else {
                      swal("transactions still here!");
                    }
                  });
              }
                else if(count === 0){
                  swal({
                    text: "No transactions to remove",
                    buttons: false,
                    timer:1000
                  })
                } 
            }
            }>Remove All</Remove>
      {Object.keys(couple).map(key => {
        return <Li key={key}>
            <Description style={{width:"70%",overflow:"scroll"}}>{couple[key]} </Description>
            <Amounts style={{width:"30%",overflow:"scroll"}} >{key}$</Amounts>
            <p><Remove onClick={() => { 
            
              const copyCouple = {};
                Object.keys(couple).map(key1 => {
                   var count = 0
                   for(var i in couple){
                     if(couple.hasOwnProperty(i)) count++;
                   }
                   if(count === 1){
                    setCouple({})
                   }
                  while(couple[key1] !== couple[key]){
                   copyCouple[key1] = couple[key1]
                   setCouple(copyCouple)
                   return true
                  }
                  return true
                })
              ;
              
            }}>remove</Remove></p>
            
               </Li> 
      })}
          </Ul>
        </div>
    </div>
  )
}
export default Mycomponent;

 