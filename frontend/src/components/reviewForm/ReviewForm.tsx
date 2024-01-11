import React from "react";
import {Form, Button} from "react-bootstrap";


interface ReviewFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    //revText: React.RefObject<HTMLTextAreaElement>;
    //revText: React.MutableRefObject<HTMLTextAreaElement>;
    revText: React.RefObject<HTMLTextAreaElement>;
    labelText: string;
    defaultValue?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({handleSubmit, revText, labelText, defaultValue}) => {
    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
            </Form.Group>
            <Button variant="outline-info" type="submit">Submit</Button>
        </Form>

        // <Form>
        //     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        //         <Form.Label>{labelText}</Form.Label>
        //         <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue}/>
        //     </Form.Group>
        //     <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        // </Form>
    )
}

export default ReviewForm