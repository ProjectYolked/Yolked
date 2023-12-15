import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
    const navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    return <Button onClick={onClick}>Log Out</Button>
}

export default LogOutButton;