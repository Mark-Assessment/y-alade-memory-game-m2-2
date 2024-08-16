# Rainbow Shapes Memory Game
### This is a timed memory game built using javascript. 
### Flip the cards over to reveal the matches. 
#### How many matches can you make before the timer runs out!


#### Steps of the game
1. Game resets when the page loads.
    - All cards should be white (images hidden).
    - Shuffle cards
    - Timer on 60 seconds
    - Matches and attempts at '0'

2. Click on a card to begin game
    - Timer starts
    - Reveal card image
    - If 2 cards are selected and they don't match, both card images should be hidden again

3. When you get a match
    - Two cards are flipped and the images match, both card images should stay visible
    - The 'Matches' score increments
    - Try to get all the matches before the timer runs out

4. The 'Attempts' increment every time 2 cards are selected

5. Game ends when:
    - All matches are made before/by the time the timer runs out
        - Alert message - "Congratulations, you have won the game".
    - All matches are not made before the timer runs out
        - Alert message - `Game over - you got $X matches in $X attempts`
    - User clicks 'Reset Game' button
        - Timer resets to 0
        - All card images are hidden again
        - Matches and attempts score reset to '0'

