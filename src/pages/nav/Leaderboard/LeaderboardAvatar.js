
import { list, getStorage, getDownloadURL, ref } from "firebase/storage";
import styled from "@emotion/styled";
import {useState, useEffect} from 'react';
import { CircularProgress } from "@mui/material";

const LeaderboardAvatar = (uid) => {
    
    const PictureFrame = styled.div`
    float: center;
    border: 2px solid #ff8d26;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-block;
    overflow: hidden;
    position: relative;
      
`
const [avatarUrl, setAvatarUrl] = useState("/assets/avatar.png");
const storage = getStorage();
const id = uid.uid;
const avatarUrlRef = "profilepics/" + id + ".png";

useEffect(() => {
    const checkFileExistence = async () => {
        try {
            const listResult = await list(ref(storage, 'profilepics'));
            const fileExists = listResult.items.some((item) => item.name === id + '.png');
            if (fileExists) {
                // File exists, proceed with fetching the download URL
                const url = await getDownloadURL(ref(storage, avatarUrlRef));
                setAvatarUrl(url);
            } 
        } catch (error) {
            // Error occurred while checking file existence

        }
    };
    checkFileExistence();
}, [storage, avatarUrlRef]);

return (
    <PictureFrame>
            <img src={avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover'}} alt="User Avatar" width="100%" height="auto" />
    </PictureFrame>
);
}

export default LeaderboardAvatar;