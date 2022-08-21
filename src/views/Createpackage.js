import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { createPackage } from '../api-services/package';
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
const PackageSchema = Yup.object().shape({
            description:Yup.string().required('Description is required'),
            weight: Yup.number().required('Weight is required'),
            width: Yup.number().required('Width is required'),
            height: Yup.number().required('Height is required'),
            depth: Yup.number().required('Depth is required'),
            from_name: Yup.string().required('Sender name is required'),
            from_address: Yup.string().required('Sender address is required'),
            from_location_lat: Yup.number().required('Sender lat is required'),
            from_location_log: Yup.number().required('Sender log is required'),
            to_name: Yup.string().required('Reciever is required'),
            to_address: Yup.string().required('Reciever address is required'),
            to_location_lat: Yup.number().required('Reciever lat is required'),
            to_location_log: Yup.number().required('Reciver log is required'),
  });

export default function CreatePackage () {
    const navigator = useNavigate()
    return (
        <Container>
        <h1>Package Form</h1>
            <Formik
       initialValues={{
        description : '',
            weight : '',
            width : '',
            height : '',
            depth : '',
            from_name : '',
            from_address : '',
            from_location_lat : '',
            from_location_log : '',
            to_name : '',
            to_address : '',
            to_location_lat : '',
            to_location_log: ''
       }}
       validationSchema={PackageSchema}
       onSubmit={(values, actions) => {
         const packageObject = {
            ...values, 
            from_location : {
                lat : values.from_location_lat,
                log : values.from_location_log
            },
            to_location : {
                lat : values.to_location_lat,
                log : values.to_location_log
            }
         }
         createPackage(packageObject).then(result => {
            if (!result.ok) {
                window.alert(`Error: ${result.errorMessage}`)
                actions.setSubmitting(false)
                return
            }
            window.alert('Package successfully created')
            actions.setSubmitting(false)
            navigator('/web-admin')
         })
       }}

     >
       {({ errors, touched, isSubmitting }) => (
        <>
        {isSubmitting && <Loader />}
         <Form>                      

           <Field name="weight" style={styles.fieldStyles} placeholder='Enter weight in gram'  type='number'/>
           {touched.weight && errors.weight && <div style={styles.errorStyles}>{errors.weight}</div>}

           <Field name="width" style={styles.fieldStyles} placeholder='Enter width in cm' type='number' />
           {touched.width && errors.width && <div style={styles.errorStyles}>{errors.width}</div>}

           <Field name="height" style={styles.fieldStyles} placeholder='Enter height in cm'  type='number'/>
           {touched.height && errors.height && <div style={styles.errorStyles}>{errors.height}</div>}

           <Field name="depth" style={styles.fieldStyles} placeholder='Enter depth in cm' type='number' />
           {touched.depth && errors.depth && <div style={styles.errorStyles}>{errors.depth}</div>}

           <Field name="from_name" style={styles.fieldStyles} placeholder='Enter sender name' />
           {touched.from_name && errors.from_name && <div style={styles.errorStyles}>{errors.from_name}</div>}

           <Field name="from_address" style={styles.fieldStyles} placeholder='Enter sender address' />
           {touched.from_address && errors.from_address && <div style={styles.errorStyles}>{errors.from_address}</div>}

           <Field name="from_location_lat" style={styles.fieldStyles} placeholder='Enter sender location lat' type='number'  />
           {touched.from_location_lat && errors.from_location_lat && <div style={styles.errorStyles}>{errors.from_location_lat}</div>}

           <Field name="from_location_log" style={styles.fieldStyles} placeholder='Enter sender location log' type='number'  />
           {touched.from_location_log && errors.from_location_log && <div style={styles.errorStyles}>{errors.from_location_log}</div>}

           <Field name="to_name" style={styles.fieldStyles} placeholder='Enter reciever name' />
           {touched.to_name && errors.to_name && <div style={styles.errorStyles}>{errors.to_name}</div>}

           <Field name="to_address" style={styles.fieldStyles} placeholder='Enter reciever address' />
           {touched.to_address && errors.to_address && <div style={styles.errorStyles}>{errors.to_address}</div>}

           <Field name="to_location_lat" style={styles.fieldStyles} placeholder='Enter reciever location lat' type='number'  />
           {touched.to_location_lat && errors.to_location_lat && <div style={styles.errorStyles}>{errors.to_location_lat}</div>}

           <Field name="to_location_log" style={styles.fieldStyles} placeholder='Enter reciever location log' type='number'  />
           {touched.to_location_log && errors.to_location_log && <div style={styles.errorStyles}>{errors.to_location_log}</div>}

           <Field as='textarea' name="description" rows={4}  style={styles.fieldStyles} placeholder='Enter description' />
           {touched.description && errors.description && <div style={styles.errorStyles}>{errors.description}</div>}

           <div style={{width: '100%', margin:'20px 0'}}>
                <Button type='submit'>Submit</Button>
           </div>
         </Form>
         </>
       )}
     </Formik>
        </Container>
    )
}