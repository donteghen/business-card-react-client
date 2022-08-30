import { useState, useEffect, useRef} from "react";
import styled from "styled-components"
import { getSingleDelivery } from "../api-services/delivery";
import { getSinglePackage } from "../api-services/package";
import DeliveryDetail from "../components/DeliveryDetail";
import Loader from "../components/Loader";
import Maper from "../components/Maper";
import PackageDetail from "../components/PackageDetail";
import { io } from "socket.io-client";


const socket = io('http://localhost:8080')

const Container = styled.div`
    height: 100%;
    background:#b1e1b1;
    padding: 50px 50px;
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
    background: ${prop => prop.color} ;
    border: 1px solid;
    font: inherit;
    padding: ${prop => prop.lg ? '10px 20px' : '10px 5px'};
    margin-bottom: ${prop => prop.space ? '10px' : 0};
    border-radius:5px;
    font-size:14px;
    &:hover, :focus {
        cursor: pointer;
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.10em);
    };
    @media (max-width: 480px) {
        width: 100%;
    } 
`
const TrackButton = styled(Button)`
    width: 30%;
`;
const Input = styled.input`
    padding: 12px 10px;
    width: 60%;
    font-size:20px;
    @media (max-width: 480px) {
        width: 100%;
    } 
`;

export default function Webdriver () {

    const [loading, setLoading] = useState(false)
    const [deliveryId, setDeliveryId] = useState('')
    const [delivery, setDelivery] = useState()
    const [relatedPackage, setRelatedPackage] = useState()
    let tick = useRef()
    // const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
      socket.on('connect', () => {
        console.log('web-driver connected')
      })
      
      socket.on('PING', (data) => {
        console.log(data)
      })

      socket.on('disconnect', (data) => {
        console.log('web-driver disconnected')
        
      })
      
      tick.current = setInterval(() => {
        handleLocationUpdate()       
      }, 20000);

      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('PING');
        clearInterval(tick.current)
      }
    }, [delivery, deliveryId])

    

    const handleStatusUpdate = (status) => {
        
        if (!socket.connected || !delivery?._id) {
            return
        }
        const payload = {
            event : 'STATUS_CHANGED',
            deliveryId : delivery?._id.toString(),
            status : status
        }
        // console.log(payload)
        socket.emit('STATUS_CHANGED', payload)
        reloadDelivery()
    }

    const handleLocationUpdate = () => {
        // console.log(delivery?._id, 'sending', delivery, deliveryId)
        if (!deliveryId) {
            return
        }
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          };

        function success(pos) {
          const {latitude, longitude} = pos.coords;    
          const payload = {
            event : 'LOCATION_CHANGED',
            deliveryId : delivery?._id?.toString(),
            location : {
                lat : latitude,
                log : longitude
            }
          }    
          // console.log(payload)
          socket.emit('LOCATION_CHANGED', payload)
          reloadDelivery()
        }
        
        function error(err) {
          window.alert(`Error: code is ${err.code} & message is ${err.messgae}`)
        }
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    const handleTrack = () => {
        if (!deliveryId) {
            return
        }
        setLoading(true)
        getSingleDelivery(deliveryId).then(result => {
            if (!result.ok) {
                window.alert(`Delivery fetch error: ${result.errorMessage}`)
                return
            }
            setDelivery(result.data)
            getRelatedPackage(result.data?.package_id)
            setLoading(false)
          })

          
    }
    const reloadDelivery = () => {
        getSingleDelivery(deliveryId).then(result => {
            if (!result.ok) {
                window.alert(`Delivery fetch error: ${result.errorMessage}`)
                return
            }
            setDelivery(result.data)
          })

    }
    const getRelatedPackage = (packageId) => {
        getSinglePackage(packageId).then(result => {
            if (!result.ok) {
                window.alert(`Related package fetch error: ${result.errorMessage}`)
                return
            }
            setRelatedPackage(result.data)
        })
    }
   
    return (
        <Container>
            {loading && <Loader />}
            <Topsection >
                <Input  value={deliveryId} placeholder="Enter Delivery ID" onChange={e => setDeliveryId(e.target.value)} />
                <TrackButton color="lightgreen" lg onClick={handleTrack}>Track</TrackButton>
            </Topsection>
            <Bottomsection>
                <div style={{width:'30%'}}>
                    <PackageDetail _package={relatedPackage}/>
                    <DeliveryDetail delivery={delivery}/>
                </div>
                <div style={{width:'50%', }}>
                {(delivery?._id && relatedPackage?._id) && <Maper current_location={delivery?.location} from_location={relatedPackage?.from_location} to_location={relatedPackage?.to_location} />}
                </div>
                <div style={{width:'15%', display:'flex', flexDirection:'column', justifyContent:''}}>
                    <Button disabled={delivery?.status !== 'OPEN'} space color="lightblue" onClick={() => handleStatusUpdate('PICKED_UP')}>Picked Up</Button>
                    <Button disabled={delivery?.status !== 'PICKED_UP'} space color="orange" onClick={() => handleStatusUpdate('In_TRANSIT')}>In Transit</Button>
                    <Button disabled={delivery?.status !== 'In_TRANSIT'} space color="green" onClick={() => handleStatusUpdate('DELIVERED')}>Delivered</Button>
                    <Button disabled={delivery?.status !== 'In_TRANSIT'} space color="red" onClick={() => handleStatusUpdate('FAILED')}>Failed</Button>
                </div>
            </Bottomsection>
        </Container>
    )
}