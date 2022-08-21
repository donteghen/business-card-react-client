import { useState, useEffect} from "react";
import styled from "styled-components"
import { getSingleDelivery } from "../api-services/delivery";
import { getSinglePackage } from "../api-services/package";
import DeliveryDetail from "../components/DeliveryDetail";
import Loader from "../components/Loader";
import Maper from "../components/Maper";
import PackageDetail from "../components/PackageDetail";
// import { io } from "socket.io-client";

// const socket = io('http://localhost:8080')

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
    const [delivery, setDelivery] = useState({})
    const [relatedPackage, setRelatedPackage] = useState({})
    // const [isConnected, setIsConnected] = useState(false)

    // useEffect(() => {
    //   socket.on('connect', (data) => {
    //     setIsConnected(true)
    //   })
      
    //   socket.on('PING', (data) => {
    //     setIsConnected(true)
    //   })

    //   socket.on('disconnect', (data) => {
    //     setIsConnected(false)
    //   })
      
    //   return () => {
    //     socket.off('connect');
    //     socket.off('disconnect');
    //     socket.off('PING');
    //   }
    // }, [])

    // useEffect(() => {
    //     socket.on('connect', (data) => {
    //       setIsConnected(true)
    //     })
    //     socket.on('disconnect', (data) => {
    //       setIsConnected(false)
    //     })
    //     socket.on('PING', (data) => {
    //       setIsConnected(true)
    //     })
  
    //     return () => {
    //       socket.off('connect');
    //       socket.off('disconnect');
    //       socket.off('PING');
    //     }
    //   }, [])
    
    const handleTrack = () => {
        if (!deliveryId) {
            return
        }
        setLoading(true)
        getSingleDelivery(deliveryId).then(result => {
            if (!result.ok) {
                window.alert(`Delivery fetch error: ${result.errorMessage}`)
                setDeliveryId('')
                return
            }
            setDelivery(result.data)
            getRelatedPackage(result.data?.package_id)
            setDeliveryId('')
            setLoading(false)
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
    const handleStatusUpdate = (statue) => {
        return
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
                <div style={{width:'50%', border:'1px solid black'}}>
                    <Maper />
                </div>
                <div style={{width:'15%', display:'flex', flexDirection:'column', justifyContent:''}}>
                    <Button space color="lightblue" onClick={() => handleStatusUpdate('PICKED_UP')}>Picked Up</Button>
                    <Button space color="orange" onClick={() => handleStatusUpdate('In_TRANSIT')}>In Transit</Button>
                    <Button space color="green" onClick={() => handleStatusUpdate('DELIVERED')}>Delivered</Button>
                    <Button space color="red" onClick={() => handleStatusUpdate('FAILED')}>Failed</Button>
                </div>
            </Bottomsection>
        </Container>
    )
}