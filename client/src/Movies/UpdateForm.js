import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: '',
    director:'',
    metascore:'',
    stars: []
}


const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie)
    const {push} = useHistory();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {setMovie(res.data)})
            .catch(err => console.log(err))
    }, [id])



    const handleChanges = e => {
        setMovie({
          ...movie,
          [e.target.name]: e.target.value,
        });
    }

    const setItem = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log('API response', res.data)
                push(`/movies/${id}`)
            })
            .catch(err => console.log(err))
    };

        return(
            <form className='form' onSubmit={setItem}>
                <h4>Update Movie:</h4>
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

                <button>Update</button>
            </form>
        )
}


export default UpdateForm;