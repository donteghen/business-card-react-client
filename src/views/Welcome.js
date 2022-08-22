import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    background:#b1e1b1;
    padding: 50px 100px;
    text-align: center;
    @media (max-width: 480px) {
        padding: 10px 25px;
    }  
`;
const BtnContainer = styled.div`
    display: flex;
    flex-dorection: row;
    justify-content: space-between;
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
export default function Welcome () {
    const navigator = useNavigate()
    return (
        <Container>
            <h1>Welcome to the business card project</h1> 
            <BtnContainer >
                <Button onClick={() => navigator('/web-tracker')}>web tracker</Button>
                <Button onClick={() => navigator('/web-driver')}>web driver</Button>
                <Button onClick={() => navigator('/web-admin')}>web admin</Button>
            </BtnContainer>
            
        </Container>
    )
}