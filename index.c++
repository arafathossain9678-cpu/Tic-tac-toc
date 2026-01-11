#include <iostream>
using namespace std;

char board[3][3] = {
    {'1','2','3'},
    {'4','5','6'},
    {'7','8','9'}
};

char turn = 'X';
int choice;
bool draw = false;

void display_board() {
    cout << "\nTic Tac Toe Game\n\n";
    for(int i = 0; i < 3; i++) {
        cout << " ";
        for(int j = 0; j < 3; j++) {
            cout << board[i][j];
            if(j < 2) cout << " | ";
        }
        if(i < 2) cout << "\n---+---+---\n";
    }
    cout << endl;
}

void player_turn() {
    cout << "\nPlayer " << turn << ", enter your choice: ";
    cin >> choice;

    int row, col;

    if(choice == 1) row = 0, col = 0;
    else if(choice == 2) row = 0, col = 1;
    else if(choice == 3) row = 0, col = 2;
    else if(choice == 4) row = 1, col = 0;
    else if(choice == 5) row = 1, col = 1;
    else if(choice == 6) row = 1, col = 2;
    else if(choice == 7) row = 2, col = 0;
    else if(choice == 8) row = 2, col = 1;
    else if(choice == 9) row = 2, col = 2;
    else {
        cout << "Invalid choice!";
        player_turn();
        return;
    }

    if(board[row][col] != 'X' && board[row][col] != 'O') {
        board[row][col] = turn;
        turn = (turn == 'X') ? 'O' : 'X';
    } else {
        cout << "Box already filled! Try again.\n";
        player_turn();
    }
}

bool game_over() {
    
    for(int i = 0; i < 3; i++) {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2])
            return false;
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i])
            return false;
    }

    if(board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return false;
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return false;


    for(int i = 0; i < 3; i++)
        for(int j = 0; j < 3; j++)
            if(board[i][j] != 'X' && board[i][j] != 'O')
                return true;

    draw = true;
    return false;
}

int main() {
    while(game_over()) {
        display_board();
        player_turn();
    }

    display_board();

    if(draw)
        cout << "\nGame Draw!\n";
    else
        cout << "\nPlayer " << ((turn == 'X') ? 'O' : 'X') << " wins!\n";

    return 0;
}
