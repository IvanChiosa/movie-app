import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import axios from "axios";

// Typdefinitionen für die Props
interface Review {
    id?: string;
    body: string;
}
interface Movie {
    poster?: string;
}
interface ReviewsProps {
    getMovieData: (movieId: string | undefined) => void;
    movie: Movie;
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const Reviews: React.FC<ReviewsProps> = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef<HTMLTextAreaElement>(null);
    const params = useParams<{ movieId: string }>();
    const movieId = params.movieId;


    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (revText.current) {
            const rev = revText.current.value;

            try {
                // Annahme: Der Server gibt die vollständige Review zurück
                const response = await axios.post<Review>("/api/v1/reviews", { reviewBody:rev , imdbId: movieId });

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
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    {/*// hier fehlt noch ein Bild*/}
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return(
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <hr />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    )
}

export default Reviews;












// import {useEffect, useRef} from 'react';
// import api from '../../api/axiosConfig';
// import {useParams} from 'react-router-dom';
// import {Container, Row, Col} from 'react-bootstrap';
// import ReviewForm from "../reviewForm/ReviewForm.tsx";
// import {Movie, Review} from "../../Interfaces.tsx";
//
// interface ReviewsProps {
//     getMovieData: (movieId: string | undefined) => void; // Funktion, die Daten abruft, Typ angepasst an Ihre Bedürfnisse
//     movie: Movie; // Typ für 'movie', passen Sie dies an Ihr Schema an
//     reviews: Review[]; // Array von Review-Objekten, passen Sie den Typ an Ihre Bedürfnisse an
//     setReviews: (reviews: (Review | { body: string })[]) => void; // Funktion zum Aktualisieren der Reviews
// }
//
// // interface Movie {
// //     // Definieren Sie hier die Eigenschaften eines Movie-Objekts
// //     // Beispiel:
// //     id: string;
// //     title: string;
// //     poster: string;
// //     // usw...
// // }
// //
// // interface Review {
// //     // Definieren Sie hier die Eigenschaften eines Review-Objekts
// //     // Beispiel:
// //     id: string;
// //     body: string;
// //     // usw...
// // }
//
// const Reviews: React.FC<ReviewsProps> = ({getMovieData, movie, reviews, setReviews}) => {
//
//     const revText = useRef<HTMLTextAreaElement>(null);
//     const params = useParams();
//     const movieId = params.movieId;
//
//     useEffect(() => {
//         getMovieData(movieId);
//     }, [])
//
//     const addReview = async (e: React.FormEvent) => {
//         e.preventDefault();
//
//         // Typsicherheit für revText.current, es wird als HTMLTextAreaElement angenommen
//         const rev = revText.current as unknown as HTMLTextAreaElement | null;
//
//         if (!rev || !rev.value) {
//             console.error('Review text is empty or missing');
//             return;
//         }
//
//         try {
//             // Annahme, dass api.post die richtige Typisierung hat
//             // eslint-disable-next-line @typescript-eslint/no-unused-vars
//             await api.post("/api/v1/reviews", {
//                 reviewBody: rev.value,
//                 imdbId: movieId  // Stellen Sie sicher, dass movieId definiert und korrekt typisiert ist
//             });
// // Aktualisieren der Bewertungen
//             const updatedReviews = [...reviews, {body: rev.value}];  // Annahme, dass 'reviews' korrekt typisiert ist
//
//             // Zurücksetzen des Eingabefeldes
//             rev.value = "";
//
//             // Aktualisieren des State
//             setReviews(updatedReviews);  // Stellen Sie sicher, dass setReviews korrekt typisiert ist
//         } catch (err) {
//             // Fehlerbehandlung
//             console.error(err);
//         }
//     }
//
//     return (
//         <Container>
//             <Row>
//                 <Col><h3>Reviews</h3></Col>
//             </Row>
//             <Row className="mt-2">
//                 <Col>
//                     <img src={movie?.poster} alt=""/>
//                 </Col>
//                 <Col>
//                     {
//                         <>
//                             <Row>
//                                 <Col>
//                                     <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"/>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <hr/>
//                                 </Col>
//                             </Row>
//                         </>
//                     }
//                     {
//                         reviews?.map((r) => {
//                             return (
//                                 <>
//                                     <Row>
//                                         <Col>{r.body}</Col>
//                                     </Row>
//                                     <Row>
//                                         <Col>
//                                             <hr/>
//                                         </Col>
//                                     </Row>
//                                 </>
//                             )
//                         })
//                     }
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <hr/>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }
//
// export default Reviews