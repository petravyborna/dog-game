import React, { useEffect, useState } from "react";
import "./../styles/Game.css";

const Game = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [breed, setBreed] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            const imageUrl = data.message;
            const breedName = imageUrl.split("/")[4]; // this gets the dog breed from url (breed at place 4)
            
            setImageUrl(imageUrl);
            setBreed(breedName);
            generateOptions(breedName);
            setSelectedOption(null); // reset selection
            setResult(""); // reset result message
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const generateOptions = (correctBreed) => {
        const breeds = ["labrador", "bulldog", "beagle", correctBreed]; // gives options
        setOptions(shuffleArray(breeds));
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleGuess = (option) => {
        setSelectedOption(option);
        setResult(option === breed ? "Correct! You are a real dog connoisseur!" : " Incorrect, try again!");
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="game-container">
            <h2>GUESS THE DOG BREED</h2>
            {imageUrl && <img src={imageUrl} alt="Random Dog" className="dog-image" />}
            <div className="options">
                {options.map((option, index) => (
                    <button key={index} onClick={() => handleGuess(option)}>
                        {option}
                    </button>
                ))}
            </div>
            {selectedOption && <p className="result">{result}</p>}
            <button className="new-dog-button" onClick={fetchData}>Get Another Dog</button>
        </div>
    );
};

export default Game;
