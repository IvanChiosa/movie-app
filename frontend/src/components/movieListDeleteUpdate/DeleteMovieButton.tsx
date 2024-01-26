import React from 'react';
import axios from 'axios';
import "./MovieList.css";

interface DeleteMovieProps {
    movieId: string;
    onDeletionSuccess: () => void;
    onDeletionFailure: () => void;
}

const DeleteMovieButton: React.FC<DeleteMovieProps> = ({movieId, onDeletionSuccess, onDeletionFailure}) => {
    const handleDelete = async () => {
        console.log('movieId:', movieId);
        try {
            // Senden Sie die DELETE-Anfrage an Ihre API unter Verwendung des movieId-Parameters
            const response = await axios.delete(`/api/v1/movies/${movieId}`);
            console.log('Löschen erfolgreich:', response);
            onDeletionSuccess();
        } catch (error) {
            // Rufe ich die Fehlerfunktion auf, wenn ein Fehler auftritt
            console.error('Fehler beim Löschen des Films', error);
            onDeletionFailure();
        }
    };
    return (
        <button className="btn-bearbeiten-löschen" onClick={handleDelete}>Film löschen</button>
    );
};
export default DeleteMovieButton;