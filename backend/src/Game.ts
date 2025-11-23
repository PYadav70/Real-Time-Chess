import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER } from "./messages.js";

export  class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board : Chess;
    private startTime: Date;

    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player1;
        this.board = new Chess();
        // this.moves = [];
        this.startTime = new Date();
    }
   

    makeMove(socket:WebSocket, move:{
        from :string;
        to : string;
    }){
       if(this.board.moves.length % 2 === 0 && socket !== this.player1){
        return 
       }
       if(this.board.moves.length % 2 === 0 && socket !== this.player2){
        return 
       }
        try {
            this.board.move(move)
        } catch (error) {
            return
        }

        if(this.board.isGameOver()){
            //SEND THE GAME OVER MESSAGE TO BOTH PLAYER
            this.player1.emit(JSON.stringify({
                type : GAME_OVER
            }))
            return
        }

    }
   





    
}