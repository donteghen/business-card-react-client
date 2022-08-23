import { useState, useEffect} from "react";
import styled from "styled-components"
import { getSingleDelivery } from "../api-services/delivery";
import { getSinglePackage } from "../api-services/package";
import DeliveryDetail from "../components/DeliveryDetail";
import Loader from "../components/Loader";
import Maper from "../components/Maper";
import PackageDetail from "../components/PackageDetail";
import {io} from 'socket.io-client'

const socket = io('http://localhost:8080')

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
    width: 30%;
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
const Input = styled.input`
    padding: 12px 10px;
    width: 60%;
    font-size:20px;
    @media (max-width: 480px) {
        width: 100%;
    } 
`;

export default function Webtracker () {
    const [loading, setLoading] = useState(false)
    const [packageId, setPackageId] = useState('')
    const [packag, setPackag] = useState({})
    const [relatedDelivery, setRelatedDelivery] = useState({})


    useEffect(() => {
        socket.on('connect', (data) => {
          console.log('web-tracker connected')
        })
        
        socket.on('PING', (data) => {
          console.log(data)
        })
  
        socket.on('disconnect', (data) => {
          console.log('web-tracker disconnected')
        })

        socket.on('DELIVERY_UPDATE', (data) => {
            console.log(relatedDelivery)
            console.log(data?.delivery?._id === relatedDelivery?._id, data?.delivery?._id, relatedDelivery?._id)
            // check to make sure the in-coming delivery object is the package's relatedDelivery before updating the map
            if (data?.delivery?._id === relatedDelivery?._id) {
                setRelatedDelivery(data.delivery)
            }           
        })
  
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('PING');
          socket.off('DELIVERY_UPDATE')
        }
      }, [])

    const handleTrack = () => {
        if (!packageId) {
            return
        }
        setLoading(true)
        getSinglePackage(packageId).then(result => {
            setLoading(false)
            if (!result.ok) {
                window.alert(`Package fetch error: ${result.errorMessage}`)
                setPackageId('')
                return
            }
            setPackag(result.data)
            if (result.data?.active_delivery_id) {
                getRelatedDelivery(result.data?.active_delivery_id)
            }
            setPackageId('')
          })
    }

    const getRelatedDelivery = (deliveryId) => {
        getSingleDelivery(deliveryId).then(result => {
            if (!result.ok) {
                window.alert(`Related delivery fetch error: ${result.errorMessage}`)
                return
            }
            setRelatedDelivery(result.data)
        })
    }
    
    return (
        <Container>
            {loading && <Loader />}
            <Topsection >
                <Input  value={packageId} placeholder="Enter Package ID" onChange={e => setPackageId(e.target.value)} />
                <Button onClick={handleTrack}>Track</Button>
            </Topsection>
            <Bottomsection>
                <div style={{width:'45%'}}>
                    <PackageDetail _package={packag}/>
                    <DeliveryDetail delivery={relatedDelivery}/>
                </div>
                <div style={{width:'50%',}}>
                    {relatedDelivery?._id && <Maper current_location={relatedDelivery?.location} from_location={packag?.from_location} to_location={packag?.to_location} />}
                </div>
            </Bottomsection>
        </Container>
    )
}