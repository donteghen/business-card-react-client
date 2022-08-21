import styled from "styled-components";

const Li  = styled.li`
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
const Tableheader = styled(Li)`
  background-color: #95A5A6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;
const Tablerow = styled.li` 
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
`;

const Col1 = styled.div`
      width: 45%;
      justify-content: flex-end;
      overflow: auto;
    `;
    const Col2 = styled.div`
      width: 25%;
      justify-content: flex-end;
      overflow: auto;
    `;
    const Col3 = styled.div`
      width: 15%;
      justify-content: flex-end;
      overflow: auto;
    `;
    const Col4 = styled.div`
      width: 15%;
      justify-content: flex-end;
      overflow: auto;
    `;


export default function DeliveryList ({deliveries}) {

return (
    <div>
        <h1>Delivery List</h1>
        <div>
        {(!deliveries || deliveries.length < 1) ? 
        <h4 style={{padding:'20px 10px', background:'yellow', color:'white'}}>No delivery available yet!</h4> : 
        <ul style={{listStyle:'none', paddingLeft:0}}>
            <Tableheader>
                <Col1 >Delivery Id</Col1>
                <Col2 >Status</Col2>
                <Col3 >lat</Col3>
                <Col4 >log</Col4>
            </Tableheader>
            {deliveries.map((delivery, index)=> <Tablerow key={index + delivery._id}>
            <Li >
                <Col1 data-label="deliveryId">{delivery._id}</Col1>
                <Col2  data-label="status">{delivery.status}</Col2>
                <Col3 data-label="lat">{delivery.location?.lat??'No Provided'}</Col3>
                <Col4 data-label="log">{delivery.location?.log??'Not Provided'}</Col4>
                </Li>
            </Tablerow>)}               
        </ul>}
        </div>
    </div>
    
)
}