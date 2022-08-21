import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { createDelivery } from '../api-services/delivery';
import { getpackages } from '../api-services/package';
import Loader from '../components/Loader';

const Container = styled.div`
    height: 100vh;
    background:#b1e1b1;
    padding: 50px 100px;
    @media (max-width: 480px) {
        padding: 10px 25px;
    } 
`;

const styles = {
    fieldStyles : {
        width: '100%', 
        marginTop: '10px', 
        padding:'10px 2px',
        fontSize:'14px'
    },
    errorStyles : {
        fontSize:'10px',
        color:'red'
    }
}
const Button = styled.button`
    background: lightgreen;
    border: 1px solid;
    font: inherit;
    padding: 10px 20px;
    border-radius:5px;
    width: 30%;
    font-size:18px;
    float:right;
    &:hover, :focus {
        cursor: pointer;
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.10em);
    };
    @media (max-width: 480px) {
        width: 100%;
    } 
`;
const DeliverySchema = Yup.object().shape({
    package_id : Yup.string().required('Select package ID'),
    pickup_time : Yup.date().required('Pick up time is required'),
    start_time : Yup.date().required('Start time is required'),
    end_time : Yup.date().required('End time is required'),
    location_lat : Yup.number().required('Location lattitude time is required'),
    location_log : Yup.number().required('Location longitude time is required'),
  });

export default function CreateDelivery() {
    const navigator = useNavigate()
    const [packages, setPackages] = useState([])

    useEffect(() => {
        getpackages().then(result => {
            setPackages(result.data)
        })
    }, [])
    return (
        <Container>
        <h1>Delivery Form</h1>
            <Formik
       initialValues={{
        package_id : '',
        pickup_time : '',
        start_time : '',
        end_time : '',
        location_lat : undefined,
        location_log : undefined
       }}
       validationSchema={DeliverySchema}
       onSubmit={({package_id, pickup_time, start_time, end_time, location_lat, location_log}, actions)=> {
         const deliveryObject = {
            package_id,
            pickup_time : Date.parse(pickup_time), 
            start_time : Date.parse(start_time), 
            end_time : Date.parse(end_time),
            location:{
                lat : location_lat,
                log : location_log
            }
         }
         createDelivery(deliveryObject).then(result => {
            if (!result.ok){
                window.alert(`Error: ${result.errorMessage}`)
                actions.setSubmitting(false)
                return
            }
            
            window.alert('Delivery successfully created')
            actions.setSubmitting(false)
            navigator('/web-admin')
         })
       }}

     >
       {({ errors, touched, isSubmitting }) => (
        <>
        {isSubmitting && <Loader />}
         <Form>
         <Field as="select" name="package_id" style={styles.fieldStyles} placeholder='Select Package ID'>
            <option value=''></option>
            {packages.map(pack => <option key={pack._id} value={pack._id}>{pack._id}</option>)}
         </Field>
           {touched.package_id && errors.package_id && <div style={styles.errorStyles}>{errors.package_id}</div>}

           <Field name="pickup_time" style={styles.fieldStyles} placeholder='Enter pick up time' type='datetime-local' />
           {touched.pickup_time && errors.pickup_time && <div style={styles.errorStyles}>{errors.pickup_time}</div>}

           <Field name="start_time" style={styles.fieldStyles} placeholder='Enter start time'  type='datetime-local'/>
           {touched.start_time && errors.start_time && <div style={styles.errorStyles}>{errors.start_time}</div>}

           <Field name="end_time" style={styles.fieldStyles} placeholder='Enter end time' type='datetime-local' />
           {touched.end_time && errors.end_time && <div style={styles.errorStyles}>{errors.end_time}</div>}

           <Field name="location_lat" style={styles.fieldStyles} placeholder='Enter location lattitude'  type='number'/>
           {touched.location_lat && errors.location_lat && <div style={styles.errorStyles}>{errors.location_lat}</div>}  

           <Field name="location_log" style={styles.fieldStyles} placeholder='Enter location longitude'  type='number'/>
           {touched.location_log && errors.location_log && <div style={styles.errorStyles}>{errors.location_log}</div>}          

           <div style={{width: '100%', margin:'20px 0'}}>
                <Button type='submit' >Submit</Button>
           </div>
         </Form>
         </>
       )}
     </Formik>
        </Container>
    )
}