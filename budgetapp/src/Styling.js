import styled from 'styled-components'
export const Button = styled.button`
margin: 30px;
width: 30%;
padding: 5px 0;
background-color: #395a86;
color: #f6f6f6;
border-radius:10px;
cursor: pointer;
&:hover{
    color: #395a86;
    background-color: #f6f6f6;
}
`
export const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`
export const MoneyDiv = styled.div`
display: flex;
flex-direction: column;
text-align: center;
width: 100%;
padding: 20px 0;
`
export const Input = styled.input`
padding: 10px;
background-color: transparent;
border: none;
border-bottom:1px solid #333 ;
margin: 20px 7px;
`
export const Checkbox = styled.div `
display: flex;
flex-direction: column;
text-align: center;
`
export const Reset = styled.button`
margin-top: 30px;
background-color: transparent;
border: none;
cursor: pointer;
color: #395a86;
`