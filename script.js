// Professional Tic-Tac-Toe Game Logic
class TicTacToeGame {
    constructor() {
        // Game state
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        // Winning combinations
        this.winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('currentPlayer');
        this.gameStatus = document.getElementById('gameStatus');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');
        this.resetBtn = document.getElementById('resetBtn');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.modal = document.getElementById('gameModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        
        this.initializeGame();
    }
    
    initializeGame() {
        // Add event listeners
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
        
        this.updateDisplay();
    }
    
    handleCellClick(index) {
        // Check if cell is already taken or game is not active
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        // Make move
        this.board[index] = this.currentPlayer;
        const cell = this.cells[index];
        
        // Update cell appearance
        cell.textContent = this.currentPlayer;
        cell.classList.add('taken');
        cell.classList.add(`player-${this.currentPlayer.toLowerCase()}`);
        
        // Add entrance animation
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 50);
        
        // Check for win or draw
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
        
        this.updateDisplay();
    }
    
    checkWin() {
        return this.winConditions.some(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                // Highlight winning cells
                this.highlightWinningCells(condition);
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        
        // Update game status
        this.gameStatus.textContent = `Player ${this.currentPlayer} wins!`;
        this.gameStatus.classList.add('winner');
        
        // Show modal after a brief delay
        setTimeout(() => {
            this.showModal(`Player ${this.currentPlayer} Wins!`, `Congratulations! Player ${this.currentPlayer} has won this round.`);
        }, 1000);
    }
    
    handleDraw() {
        this.gameActive = false;
        
        // Update game status
        this.gameStatus.textContent = "It's a draw!";
        this.gameStatus.classList.add('draw');
        
        // Show modal after a brief delay
        setTimeout(() => {
            this.showModal("It's a Draw!", "Good game! No one wins this round.");
        }, 1000);
    }
    
    highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateDisplay() {
        // Update current player indicator
        this.currentPlayerDisplay.textContent = this.currentPlayer;
        this.currentPlayerDisplay.className = `player-indicator ${this.currentPlayer === 'O' ? 'player-o' : ''}`;
        
        // Update game status
        if (this.gameActive) {
            this.gameStatus.textContent = `Player ${this.currentPlayer}'s turn`;
            this.gameStatus.className = 'game-status';
        }
    }
    
    updateScoreDisplay() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }
    
    resetGame() {
        // Reset game state
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Reset cells
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.style.transform = '';
        });
        
        // Reset game status
        this.gameStatus.className = 'game-status';
        
        this.updateDisplay();
    }
    
    newGame() {
        this.resetGame();
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
    }
    
    playAgain() {
        this.closeModal();
        this.resetGame();
    }
    
    showModal(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modal.classList.add('show');
        
        // Focus the play again button for accessibility
        setTimeout(() => {
            this.playAgainBtn.focus();
        }, 300);
    }
    
    closeModal() {
        this.modal.classList.remove('show');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect simulation (visual feedback)
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (!cell.classList.contains('taken')) {
                cell.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        cell.addEventListener('mouseleave', () => {
            if (!cell.classList.contains('taken')) {
                cell.style.transform = '';
            }
        });
    });
    
    // Add button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .btn { position: relative; overflow: hidden; }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: scale(0);
                        animation: ripple-animation 0.6s linear;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to { transform: scale(4); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});