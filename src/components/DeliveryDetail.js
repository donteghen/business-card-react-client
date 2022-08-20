export default function DeliveryDetail ({delivery}) {
    return (
        <div style={{border:'1px solid black', margin:'20px 0'}}>
            <h1>Delivery Detail</h1>
            <p>status: {delivery?.status} {' '} id:{delivery?.id}</p>
        </div>
    )
}