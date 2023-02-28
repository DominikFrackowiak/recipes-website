import { useState, useEffect } from 'react'
import { projectFirestore } from '../../../firebase/config'
import RecipeList from '../../components/RecipeList'

import './Home.css'

export default function Home() {
	const [data, setData] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		setIsPending(true)

		projectFirestore
			.collection('recipes')
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					setError('No recipes to load')
					setIsPending(false)
				} else {
					let results = []
					snapshot.docs.forEach(doc =>
						results.push({ id: doc.id, ...doc.data() })
					)
					setData(results)
					setIsPending(false)
				}
			})
			.catch(error => {
				setError(error.message)
				setIsPending(false)
			})
	}, [])

	return (
		<div className='home'>
			{isPending && <p className='loading'>Loading...</p>}
			{error && <p className='error'>{error}</p>}
			{data && <RecipeList data={data} />}
		</div>
	)
}
