import React from 'react';
import axios from 'axios';

interface UpdateMovieProps {
    movieId: string;
    onUpdateSuccess: () => void;
    onUpdateFailure: () => void;
}

const UpdateMovieButton: React.FC<UpdateMovieProps> = ({ movieId, onUpdateSuccess, onUpdateFailure }) => {
    const handleUpdate = async () => {
        try {
            // Hier können Sie den Update-Endpunkt anpassen und die gewünschten Daten senden
            const updatedData = {
                // Fügen Sie hier die zu aktualisierenden Daten hinzu
            };

            await axios.put(`/api/v1/movies/${movieId}`, updatedData);
            onUpdateSuccess();
        } catch (error) {
            console.error('Fehler beim Aktualisieren des Films', error);
            onUpdateFailure();
        }
    };

    return (
        <button onClick={handleUpdate}>Film aktualisieren</button>
    );
};

export default UpdateMovieButton;