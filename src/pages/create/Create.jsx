import './Create.css'
import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

export default function Create() {
	const [title, setTitle] = useState('')
	const [method, setMethod] = useState('')
	const [cookingTime, setCookingTime] = useState('')
	const [newIngredient, setNewIngredient] = useState('')
	const [ingredients, setIngredients] = useState([])
	const ingredientInput = useRef(null)

	const navigate = useNavigate()

	const { postData, data, error } = useFetch(
		'http://localhost:3000/recipes',
		'POST'
	)

	const handleSubmit = e => {
		e.preventDefault()
		postData({
			title,
			method,
			cookingTime: cookingTime + ' minutes',
			ingredients,
		})
	}

	const handleAdd = e => {
		e.preventDefault()
		const ingredient = newIngredient.trim()
		if (ingredient && !ingredients.includes(ingredient)) {
			setIngredients(prevIngredients => [...prevIngredients, ingredient])
		}
		setNewIngredient('')
		ingredientInput.current.focus()
	}

	useEffect(() => {
		if (data) {
			navigate('/')
		}
	}, [data])

	return (
		<div className='create'>
			<h2 className='page-title'>Add a New Recipe</h2>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe title:</span>
					<input
						type='text'
						onChange={e => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>

				<label>
					<span>Recipe ingredients:</span>
					<div className='ingredients'>
						<input
							type='text'
							onChange={e => setNewIngredient(e.target.value)}
							value={newIngredient}
							ref={ingredientInput}
						/>
						<button onClick={handleAdd} className='btn'>
							add
						</button>
					</div>
				</label>
				<p>
					<p>
						Current ingredients:
						{ingredients.map(ingr => (
							<em key={ingr}>{ingr}, </em>
						))}
					</p>
				</p>

				<label>
					<span>Recipe method:</span>
					<textarea
						onChange={e => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>

				<label>
					<span>Cooking time (minutes):</span>
					<input
						type='number'
						onChange={e => setCookingTime(e.target.value)}
						value={cookingTime}
						required
					/>
				</label>

				<button className='btn'>submit</button>
			</form>
		</div>
	)
}
