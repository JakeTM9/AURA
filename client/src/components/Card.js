import SavedImage from "./SavedImage"
const Card = (card) => {
    console.log(card);
    return (
        //I hate that im doing card.card but im short on time to fix -> Update: fix is taking longer than 10 minutes so Im moving on
        <a href="#" key = {`${card.card.title}_active`} title={card.card.title}>
            <SavedImage name={"card" + card.card.index + ".png"}></SavedImage>
            <span key={`${card.card.title}_label`}>{card.card.title}</span>
        </a>
    );
}
export default Card;