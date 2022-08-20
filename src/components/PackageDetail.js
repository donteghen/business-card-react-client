export default function PackageDetail ({_package}) {
    return (
    <div style={{border:'1px solid black', margin:'20px 0'}}>
        <h1>Package Detail</h1>
        <p>width: {_package?.width} {' '} height:{_package?.height}</p>
    </div>
    )
}