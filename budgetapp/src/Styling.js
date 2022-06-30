import styled from 'styled-components'
export const Button = styled.button`
margin: 30px;
width: 20%;
padding: 15px 0;
font-size: 18px;
background-color: #3D64A4;
color: #f6f6f6;
border-radius:20px;
border: 1px solid #3D64A4;
cursor: pointer;
&:hover{
    color:#3D64A4;
    background-color: #f6f6f6;
}
`
export const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;

`
export const MoneyDiv = styled.div`
display: flex;
flex-direction: column;
text-align: center;
width: 100%;
padding: 20px 0;
color: #ffffff;
background: #373B44;
background: -webkit-linear-gradient(to bottom, #4286f4, #373B44);
background: linear-gradient(to bottom, #4286f4, #373B44);


`
export const Input = styled.input`
background-color: transparent;
border: none;
border-bottom:1px solid #333 ;
margin: 20px 7px;
height: 40px;
font-size: 17px;
padding: 5px;
&:focus{
  border-radius:5px;
}
`
export const Checkbox = styled.div `
display: flex;
flex-direction: column;
text-align: start;
font-size: 17px;
`
export const Reset = styled.button`
margin-top: 30px;
background-color: transparent;
border: none;
cursor: pointer;
color: #ffffff;
text-decoration: underline;
font-size: 15px;
`
export const Ul = styled.ul`
list-style: none;
margin: 0;
padding:0;
`
export const Li = styled.li`
display: flex;
flex-direction: row;
font-size: 18px;
background-color: #ffffff;
margin: 0 10px;
margin-top: 20px;
padding: 0 10px;
height: 70px;
border-radius:10px;
`
export const Remove = styled.button`
margin-right: 10px;
padding: 0;
background-color: transparent;
border: none;
border-bottom: solid 1px #395a86;
cursor: pointer;
color: #395a86;
font-size: 15px;

`
export const Description = styled.p`
margin-right: 20px;
font-weight: 500;
&::-webkit-scrollbar {display:none;}
`
export const Amounts = styled.p`
&::-webkit-scrollbar {display:none;}
`
export const DivScroll = styled.div`
&::-webkit-scrollbar {display:none;}

`