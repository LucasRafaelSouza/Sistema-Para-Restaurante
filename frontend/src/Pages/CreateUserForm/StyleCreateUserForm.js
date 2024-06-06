import styled from 'styled-components'

export const DivForm = styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(151, 60, 105,0.6); 
  color: aliceblue;
  padding: 20px;
  justify-content: center;
  text-align: center;
  width: 350px;
  height: 370px;
  color: aliceblue;
  border: 2px solid rgba(255,255,255, .4);
  border-radius: 20px;
`;
export const StylizedOption = styled.option`
  background-color: rgb(151, 60, 105,0.6); 
`;
 
export const DivInput = styled.div`
margin: 40px 0px;


`;

export const StylizedLabel = styled.label`
display:block;
`;

export const StylizedInput = styled.input`
display:block;
width: 100%; 
  height: 30px; 
background: transparent;
outline: none;
border: 2px solid rgba(255,255,255, .4);
border-radius: 30px;
color: aliceblue;
&::placeholder {
    padding: 4px;
    color: aliceblue;
  }
`;

export const StylizedSelect = styled.select`
display:block;
width: 100%; 
  height: 30px; 
background: transparent;
outline: none;
border: 2px solid rgba(255,255,255, .4);
border-radius: 30px;
color: aliceblue;

`;


export const StylizedButton = styled.button`
width: 100%;
height: 45px;
background:rgba(255, 247, 255, 1) ;
border: none;
outline: none;
border-radius: 40px;
cursor: pointer;
box-shadow: 0 0 10px rgba(0,0,0,1);
font-size: 17px;
color: #0c0e0f;
font-size: 18px;
`;