export default function DeliveryDetail ({delivery}) {
    const formatTime = (num) => {
        return new Date(num).toDateString() + ' ' + new Date(num).toTimeString()
    }
    return (
        <div style={{border:'1px solid black', margin:'20px 0'}}>
            <h1>Delivery Detail</h1>
            {(!delivery || !delivery?._id) ? 
            <h4>......................................</h4> : 
            <div>
                <p>ID: <strong>{delivery?._id?.toString()}</strong></p>
                <p>Pickup time: <strong>{formatTime(delivery?.pickup_time)}</strong></p>
                <p>Start time: <strong>{formatTime(delivery?.start_time)}</strong></p>
                <p>End time: <strong>{formatTime(delivery?.end_time)}</strong></p>
                <p>Status: <strong>{delivery?.status}</strong></p>
                <p>Location: Lat(<strong>{delivery?.location?.lat}</strong>) {' '} {' '} Log(<strong>{delivery?.location?.log}</strong>)</p>
            </div>}
        </div>
    )
}