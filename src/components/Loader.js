import styled, { keyframes } from "styled-components";

const spin = keyframes`
     0% { 
        transform: rotate(0deg); 
     }
    100% { 
        transform: rotate(360deg); 
    }
`
const Overlay = styled.div`
    position: fixed; 
    width: 100%; 
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); 
    z-index: 2; 
    cursor: pointer;
`
const LoaderDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px;
    height: 60px;
    margin: -76px 0 0 -76px;
    border: 10px solid #f3f3f3;
    border-radius: 50%;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    border-top: 10px solid #3498db;
    -webkit-animation: spin 2s linear infinite;
    animation: ${spin} 2s linear infinite;
`

export default function Loader () {
    return (
        <Overlay>
            <LoaderDiv />
        </Overlay>
        
    )
}