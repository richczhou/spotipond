import { fishes } from "../Config";
import './../ui/fish.css';

function FishCard(props) {
    // console.log(fishes)
    return (
        <div className="fish-card">
            <div className="fish-headshot">
                <img src={fishes.src} alt="gerald" />
                <h2 className="fish-name">{fishes.name}</h2>
                <h4 className="fish-rarity">{fishes.rarity}</h4>
                <p className="fish-text">{fishes.text}</p>
            </div>
        </div>
    );
}

export default FishCard;