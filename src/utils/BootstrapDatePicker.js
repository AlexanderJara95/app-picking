import { Form } from "react-bootstrap";

const BootstrapDatePicker = ({fecha}) =>{
    return(
            <div className="">
                <Form.Group controlId="dob">
                    <Form.Control type="date" name="dob" placeholder="sss" />
                </Form.Group>
            </div>
    )
}
export default BootstrapDatePicker;