
import { useEffect, useState } from 'react'
import './App.css'
import  Header from './components/Header'
import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import { getKeyboardStates } from './utils'
import { getRandomWord } from './wordService'
// import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  console.log(solution);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const getSolution = async () => {
      const newSolution = await getRandomWord();
      setSolution(newSolution);
    }

    getSolution();

  }, []);

  const handleKeyPress = key => {
    if(guesses.length === 6){
      return;
    }

    if(key === 'ENTER'){
      if(currentGuess.length === 5){
        setGuesses([...guesses, currentGuess]);

        if(currentGuess === solution){
          setTimeout(() => {
            alert('Congratulatons, you have won!');
          }, 1000);
          // alert('Congratulatons, you have won!');
          setIsGameOver(true);
        }else if (guesses.length === 5){
          setTimeout(() => {
            alert('You Lost, Game Over !!!');
          });
          setIsGameOver(true);
        }

        setCurrentGuess('');
      }
    }
    else if (key === 'BACKSPACE'){
      setCurrentGuess(prev => prev.slice(0,-1));
    }
    else if (currentGuess.length < 5){
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  };

  const keyboardStates = getKeyboardStates(guesses, solution);
  // console.log(keyboardStates);

  const resetGame = () => {
    //clear guesses
    setGuesses([]);

    //clear any game-over status
    setIsGameOver(false);

    //fetch new word for the solution
    const getNewSolution = async () => {
      const newWord = await getRandomWord();
      setSolution(newWord);
    }

    getNewSolution();
    
  }

  return (
    <div className='app'>
      <Header resetGame={resetGame}/>
      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution}/>
      <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates} />
    </div>
  )

}

export default App;
