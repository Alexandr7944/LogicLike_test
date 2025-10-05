import 'bootstrap/dist/css/bootstrap.min.css';
import {IdeaList} from "./components/Ideas/IdeaList.tsx";
import {Container} from "react-bootstrap";

function App() {

    return (
        <Container className={"py-4"}>
            <IdeaList/>
        </Container>
    )
}

export default App
