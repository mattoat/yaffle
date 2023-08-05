import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import { getAuth, updateProfile} from 'firebase/auth';

let profileURL = '';


export function getProfilePicture() {


    let auth = getAuth();

    if (auth.currentUser == null) {
        return "/assets/avatar.png";
    }
    if (profileURL != '') {
        return profileURL;
    }
    else if (localStorage.getItem('profilePic')){
         return localStorage.getItem('profilePic');
    }
    else if (Object.keys(auth.currentUser).includes("photoURL")
     && auth.currentUser.photoURL != null ) {
        return auth.currentUser.photoURL;
    }
    return "/assets/avatar.png";
}

export async function setProfilePicture(file, callback) {

    let auth = getAuth();

    let userData = auth.currentUser;

    const storage = getStorage();
          
    let avatar_url = "profilepics/" + userData.uid + ".png";
    console.log(avatar_url);
    const reference = ref(storage, avatar_url);

    const uploadTask = uploadBytesResumable(reference, file);

    uploadTask.then((url) => {


        // localStorage.removeItem('profilePic');
        
        getDownloadURL(ref(storage, avatar_url))
        .then((url) => {
            updateProfile(auth.currentUser, {photoURL : url})
            
            localStorage.setItem("profilePic", url);

            // console.log("Uploaded successfully");
            // console.log("New url: " + url);

            profileURL = url;
            callback(url);
        })
        .catch((err) => {
            console.error(err);
        });
        
    });
}