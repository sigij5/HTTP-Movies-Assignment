import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const initialMovie = {
    id: uuidv4(),
    title: '',
    director:'',
    metascore:'',
    stars: []
}


const AddMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie)
    const {push} = useHistory();
    // const {id} = useParams();
    // const {setMovieList} = props
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/movies/${id}`)
    //         .then(res => {setMovie(res.data)})
    //         .catch(err => console.log(err))
    // }, [id])



    const handleChanges = e => {
        setMovie({
          ...movie,
          [e.target.name]: e.target.value,
        });
    }

    const addMovie = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies/`, movie)
            .then(res => {
                console.log('API response', res.data)
                push(`/`)
            })
            .catch(err => console.log(err))
    };

        return(
            <form className='form' onSubmit={addMovie}>
                <h4>Add Movie:</h4>
                <label>
                    <input 
                        placeholder='Title'
                        type='text'
                        name='title'
                        value={movie.title}
                        onChange={handleChanges}
                    />
                </label>
                <label>
                    <input 
                        placeholder='Director'
                        type='text'
                        name='director'
                        value={movie.director}
                        onChange={handleChanges}
                    />
                </label>
                <label>
                    <input 
                        placeholder='Metascore'
                        type='text'
                        name='metascore'
                        value={movie.metascore}
                        onChange={handleChanges}
                    />
                </label>

                <button>Add</button>
            </form>
        )
}


export default AddMovieForm;