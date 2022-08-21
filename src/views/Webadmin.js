import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { getDeliveries } from "../api-services/delivery";
import { getpackages } from "../api-services/package";
import DeliveryList from "../components/Deliverylist";
import PackageList from "../components/Packagelist";

const Container = styled.div`
    height: 100%;
    background:#b1e1b1;
    padding: 50px 100px;
    @media (max-width: 480px) {
        padding: 10px 25px;
    } 
`;
const Topsection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom: 50px;
`;

const Bottomsection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center
`;

const Button = styled.button`
    background: lightgreen;
    border: 1px solid;
    font: inherit;
    padding: 10px 20px;
    border-radius:5px;
    font-size:18px;
    &:hover, :focus {
        cursor: pointer;
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.10em);
    };
    @media (max-width: 480px) {
        width: 100%;
    } 
`;

export default function WebAdmin () {
    const navigator = useNavigate()

    const [packages, setPackages] = useState([])
    const [deliveries, setDeliveries] = useState([])

    useEffect(() => {
      getpackages().then(result => {
        if (!result.ok) {
            window.alert(`Error: ${result.errorMessage}`)
            return
        }
        setPackages(result.data)
      })
      
      getDeliveries().then(result => {
        if (!result.ok) {
            window.alert(`Error: ${result.errorMessage}`)
            return
        }
        setDeliveries(result.data)
      })

      return () => {
        setDeliveries([])
        setPackages([])
      }
    }, [])
    
    return (
        <Container>
            <Topsection>
                <div style={{width:'65%'}}>
                    <PackageList packages={packages} />
                </div>                                
                <div style={{width:'25%'}}>
                    <Button onClick={() => navigator('create-package')}>Create Package</Button>
                </div>
            </Topsection>
            <Bottomsection>
                <div style={{width:'65%'}}>
                    <DeliveryList deliveries={deliveries} />
                </div>                                
                <div style={{width:'25%'}}>
                    <Button onClick={() => navigator('create-delivery')}>Create Delivery</Button>
                </div>
            </Bottomsection>
        </Container>
    )
}