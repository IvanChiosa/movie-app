import UpdateMovieForm from "./UpdateMovieForm.tsx";
import {useState} from "react";
import {Movie} from "./UpdateMovieForm.tsx"


interface UpdateMovieButtonProps {
    movie: Movie;
    onUpdateSuccess: () => void;
    onUpdateFailure: () => void;
}

const UpdateMovieButton: React.FC<UpdateMovieButtonProps> = ({ movie, onUpdateSuccess, onUpdateFailure }) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => setIsEditing(!isEditing);

    return (
        <>
            <button onClick={toggleEditing}>Film bearbeiten</button>
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