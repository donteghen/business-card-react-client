export default function PackageDetail ({_package}) {
    return (
    <div style={{border:'1px solid black', margin:'20px 0'}}>
        <h1>Package Detail</h1>
        {(!_package || !_package?._id) ? 
        <h4>...................................</h4> : 
        <div>
            <p>ID: <strong>{_package?._id?.toString()}</strong></p>
            <p>Active Delivery ID: <strong>{_package?.active_delivery_id??'N/A'}</strong></p>
            <p>Weight: <strong>{_package?.weight}g</strong></p>
            <p>Width: <strong>{_package?.width}cm</strong></p>
            <p>Height: <strong>{_package?.height}cm</strong></p>
            <p>depth: <strong>{_package?.depth}cm</strong></p>
            <p>Sender Name: <strong>{_package?.from_name}</strong></p>
            <p>Sender Address: <strong>{_package?.from_address}</strong></p>
            <p>Sender Location: Lat(<strong>{_package?.from_location?.lat}</strong>) {' '} {' '} Log(<strong>{_package?.from_location?.log}</strong>)</p>
            <p>Reciever Name: <strong>{_package?.to_name}</strong></p>
            <p>Reciver Address: <strong>{_package?.to_address}</strong></p>
            <p>Reciever Location: Lat(<strong>{_package?.to_location?.lat}</strong>) {' '} {' '} Log(<strong>{_package?.to_location?.log})</strong></p>
            <p>Description: <strong>{_package?.description}</strong></p>
        </div>}
    </div>
    )
}