import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
	apiKey: 'AIzaSyDmOREyusVPbm1FEfgrEwmiNoN4e95EeAw',
	authDomain: 'cooking-ninja-site-vol2.firebaseapp.com',
	projectId: 'cooking-ninja-site-vol2',
	storageBucket: 'cooking-ninja-site-vol2.appspot.com',
	messagingSenderId: '1059237524992',
	appId: '1:1059237524992:web:110a4317f162e6b0fa4ae5',
}

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()

export { projectFirestore }
