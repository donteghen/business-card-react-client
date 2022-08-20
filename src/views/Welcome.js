import { Link } from "react-router-dom";

export default function Welcome () {
    return (
        <div>
            <h1>Welcome</h1> 
            <p>Click to go to web tracker <Link to='/web-tracker' >Click now</Link></p>
        </div>
    )
}