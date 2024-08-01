import { useState, useEffect } from "react";
import { createStage } from "../components/games/tetris/tetrisUtils";
import { usePlayer } from "./usePlayer";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => 
            newStage.reduce((ack, row) => {
                // We check if the row contains any zeros
                if(row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    // We add a new empty row at the top
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);

        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        const newY = y + player.pos.y;
                        const newX = x + player.pos.x;
                        if (newStage[newY] && newStage[newY][newX]) {
                            newStage[newY][newX] = [
                                value,
                                `${player.collided ? 'merged' : 'clear'}`,
                            ];
                        }
                    }
                });
            });

            // Check if we collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};
