import SavedImage from "./SavedImage"
import Home from "../pages/Home"
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
const Card = ({card, updateInUseSaveData}) => {
    const Navigate = useNavigate();
    const goToSavedAnalysis = event => Navigate('/savedAnalysis', {replace:true});
    const openAnalysis = (event) => {
        event.preventDefault();
        const data = {
            "id": card.id,
            "numReviews": card.numReviews
        };
        updateInUseSaveData(data);
        goToSavedAnalysis();
    };
    return (
        
        <a href="#" onClick={openAnalysis} key = {`${card.title}_active`} title={card.title}>
            <SavedImage name={"card" + card.index + ".png"}></SavedImage>
            <span key={`${card.title}_label`}>{card.title}</span>
        </a>
    );
}
export default Card;