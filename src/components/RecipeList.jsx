import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'

export default function RecipeList({ data }) {
	if (data.length === 0) {
		return <div className='error'>No recipes to load... </div>
	}
	return (
		<div className='recipe-list'>
			{data.map(recipe => (
				<div key={recipe.id} className='card'>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make.</p>
					<div>{recipe.method.substring(0, 100)}...</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
				</div>
			))}
		</div>
	)
}
