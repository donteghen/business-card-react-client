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
    
   
export default function PackageList ({packages}) {
 
    return (
        <div>
            <h1>Package List</h1>
            <div>
            {(!packages || packages.length < 1) ? 
            <h4 style={{padding:'20px 10px', background:'yellow', color:'white'}}>No package available yet!</h4> : 
            <ul style={{listStyle:'none', paddingLeft:0}}>
                <Tableheader>
                    <Col1 >Package Id</Col1>
                    <Col2 >Sender</Col2>
                    <Col3 >Reciever</Col3>
                    <Col4 >Weight (grams)</Col4>
                </Tableheader>
                {packages.map((pack, index)=> <Tablerow key={index + pack._id}>
                <Li>
                    <Col1 data-label="packageId">{pack._id}</Col1>
                    <Col2  data-label="sender">{pack.from_name}</Col2>
                    <Col3 data-label="reciever">{pack.to_name}</Col3>
                    <Col4 data-label="weight">{pack.weight}</Col4>
                    </Li>
                </Tablerow>)}               
            </ul>}
            </div>
        </div>
        
    )
}