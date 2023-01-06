import { Alert } from "bootstrap";


export default function MessageBox (props) {
    return <Alert variant={props.varinat || 'info'}>{props.children}</Alert>
    
};

