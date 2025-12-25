const Header = ({resetGame}) => {

    const handleReset = () => {
        resetGame();
    }

    return (
        <>
            <div className="main-title">
                <h1 className="mb-2 text-white">Guess a word</h1>
                <span >
                    (Only 5 letter words allowed)
                </span>
            </div>
            <div className="reset-button">
                <button className="btn btn-info text-white" onClick={handleReset}>RESET</button>
            </div>
        </>

    )
};

export default Header;