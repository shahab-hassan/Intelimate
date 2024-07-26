import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function ResetPassword() {
    const [password, setPassword] = React.useState("");
    const [confirmPass, setConfirmPass] = React.useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/v1/resetPassword/${token}`, { password, confirmPass });
            enqueueSnackbar("Password reset successful", { variant: "success" });
            navigate("/login");
        } catch (e) {
            enqueueSnackbar(e.response.data.error, { variant: "error" });
        }
    };

    return (
        <div className='resetPasswordDiv'>
            <form onSubmit={resetPassword}>
                <div className='inputField'>
                    <label htmlFor="password">New Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder='Enter new password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='inputField'>
                    <label htmlFor="confirmPass">Confirm New Password</label>
                    <input 
                        type="password" 
                        name="confirmPass" 
                        placeholder='Confirm new password' 
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Reset Password" className='btn' />
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;
