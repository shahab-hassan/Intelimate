import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function ResetPasswordRequest() {
    const [email, setEmail] = React.useState("");
    const { enqueueSnackbar } = useSnackbar();

    const requestPasswordReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/v1/resetPasswordRequest", { email });
            enqueueSnackbar("Password reset link sent to your email", { variant: "success" });
        } catch (e) {
            enqueueSnackbar(e.response.data.error, { variant: "error" });
        }
    };

    return (
        <div className='resetPasswordRequestDiv'>
            <form onSubmit={requestPasswordReset}>
                <div className='inputField'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder='Enter your email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Request Password Reset" className='btn' />
                </div>
            </form>
        </div>
    );
}

export default ResetPasswordRequest;
