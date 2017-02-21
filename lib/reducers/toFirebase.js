import firebase from '../firebase';

const toFirebase = (state={}, action) => {
  switch(action.type) {
    case 'STORE':
      firebase.database().ref('newName').push({ name: action.name })
    default:
      return state;
  }
}


export default toFirebase;
