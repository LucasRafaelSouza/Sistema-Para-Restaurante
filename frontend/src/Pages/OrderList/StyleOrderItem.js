import styled from 'styled-components'



export const OrderItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 290px;
  min-height: 200px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  overflow: hidden;
`;

export const OrderItemHeaderDiv = styled.div`
  width:100%;
  min-height: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;


export const StyledP = styled.p`
  text-align: justify;
  word-wrap: break-word;
`;
export const TopLeftText = styled.div`
  
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  word-wrap: break-word;

`;

export const BottomLeftText = styled.div`
 
  margin-bottom: 8px; 
  font-size: 14px;
  max-width: 100px;
  color: #333;
  word-wrap: break-word;

`;

export const TopRightText = styled.div`
  margin-bottom: 8px;
  float: right;
  max-width: 100px;
  font-size: 14px;
  color: #333;
  word-wrap: break-word;

  

`;

export const StyledButton = styled.button`
align-self: flex-end; 
text-align: center;
border-radius: 20px;
border: 2px solid rgba(160, 1, 1, 1);
font-weight: bold;
cursor: pointer;
background: rgba(1, 1, 1, 0.4);
color: white;
`;