import { Link } from "react-router-dom";

export default function Welcome () {
    return (
        <div>
            <h1>Welcome</h1> 
            <p>Click to go to web tracker <Link to='/web-tracker' >webtracker</Link></p>
            <p>Click to go to web driver <Link to='/web-driver' >webdriver</Link></p>
            <p>Click to go to web admin <Link to='/web-admin' >webadmin</Link></p>
        </div>
    )
}