import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import axios from "axios";
import {Review, ReviewsProps} from "../../Interfaces.tsx";
import "./Reviews.css";

const Reviews: React.FC<ReviewsProps> = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef<HTMLTextAreaElement>(null);
    const params = useParams<{ movieId: string }>();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
        fetchReviews().then(r => console.log(r));
    }, [movieId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get<Review[]>(`/api/v1/movies/${movieId}/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Fehler beim Laden der Reviews:', error);
        }
    };
    const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (revText.current) {
            const rev = revText.current.value;

            try {
                // Annahme: Der Server gibt die vollständige Review zurück
                const response = await axios.post<Review>("/api/v1/reviews", {reviewBody: rev, imdbId: movieId});

                const newReview = response.data;

                // Hinzufügen der neuen Review zum bestehenden Array
                const updatedReviews = [...reviews, newReview];

                // Aktualisieren des Zustands
                setReviews(updatedReviews);

                // Zurücksetzen des Eingabefelds
                revText.current.value = "";

            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Container>
            <Row className="reviews">
                <Col>
                    <img src={movie?.poster} alt=""/>
                </Col>
                <Col>
                    <Row>
                        <Col><h3>Reviews</h3></Col>
                    </Row>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr/>
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr/>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}
export default Reviews;
