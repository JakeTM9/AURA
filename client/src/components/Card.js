const Card = (card) => {
    return (
        //I hate that im doing card.card but im short on time to fix
        <a href="#" key = {`${card.card.title}_active`} title={card.card.title}>
            <img key={`${card.card.title}_card`} src="images/all.jpg" alt="7111-m" width="290" height="242" />
            <span key={`${card.card.title}_label`}>{card.card.title}</span>
        </a>
    );
}
export default Card;