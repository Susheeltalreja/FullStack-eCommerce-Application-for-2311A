import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { otpVerifyThunk, regenaretOtpThunk } from '@/StateManagement/Authentication/Slice';
import React, { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function OtpVerify() {
    const InputsLength = 4;
    const inputRef = useRef([]);

    const [otp, setOtp] = useState("");

    const location = useLocation();
    const UserEmail = location.state;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log("location: ", location.state);

    function handleChange(e, i) {
        const value = e.target.value.slice(0, 1)

        const OtpArray = otp.split("");
        OtpArray[i] = value;
        const JoinOtpArray = OtpArray.join("")
        setOtp(JoinOtpArray)

        if (value && i < InputsLength - 1) {
            inputRef.current[i + 1].focus()
        }
    }

    function hanldeKeyDown(e, i) {
        console.log(e.key);
        if (e.key === "Backspace" && i > 0 && !otp[i]) {
            inputRef.current[i - 1].focus();
        }
    }

    function handleVerfication() {
        let data = {
            UserEmail: UserEmail,
            OTP: otp
        }
        dispatch(otpVerifyThunk(data)).then((d) => {
            if(d?.payload?.success){
                toast.success(`${d?.payload?.message}`);
                navigate("/auth/login");
            }else{
                toast.error(`${d?.payload?.message}`);
            }
        })
    }

    function handleRegenerateOtp() {
        dispatch(regenaretOtpThunk({UserEmail: UserEmail})).then((d) => {
            if(d?.payload?.success){
                toast.success(`${d?.payload?.message}`);
            }else{
                toast.error(`${d?.payload?.message}`);
            }
        });
    }

    return (
        <Fragment>
            <div className="flex px-4 flex-col gap-4 justify-center items-center h-full">
                <div className="flex gap-4">
                    {
                        Array.from({ length: InputsLength }).map((value, i) => (
                            <Input
                                key={i}
                                maxLength={1}
                                className="text-center w-[50px]"
                                ref={(e) => inputRef.current[i] = e}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => hanldeKeyDown(e, i)}
                            />
                        ))
                    }
                </div>
                <p className='text-blue-800 underline cursor-pointer' onClick={() => handleRegenerateOtp()}>Resend!</p>
                <Button className="w-[68%]" onClick={() => handleVerfication()}>Send</Button>
            </div>
        </Fragment>
    )
}

export default OtpVerify
