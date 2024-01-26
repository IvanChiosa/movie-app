import UpdateMovieForm from "./UpdateMovieForm.tsx";
import React, {useState} from "react";
import {Movie} from "./UpdateMovieForm.tsx"
import "./MovieList.css";

interface UpdateMovieButtonProps {
    movie: Movie;
    onUpdateSuccess: () => void;
    onUpdateFailure: () => void;
}

const UpdateMovieButton: React.FC<UpdateMovieButtonProps> = ({movie, onUpdateSuccess, onUpdateFailure}) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing(!isEditing);
    return (
        <>
            <button className="btn-bearbeiten-löschen" onClick={toggleEditing}>Film bearbeiten</button>
            {isEditing && (
                <UpdateMovieForm
                    movie={movie}
                    onUpdateSuccess={onUpdateSuccess}
                    onUpdateFailure={onUpdateFailure}
                    onFormClose={toggleEditing}
                />
            )}
        </>
    );
};
export default UpdateMovieButton;