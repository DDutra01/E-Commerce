import { Helmet } from "react-helmet-async";


export default function TitlePage(props) {
    return (
        <Helmet>
            <title>{props.title}</title>
        </Helmet>
    );
}