import { emailRegex, passwordRegex } from '@/utils/regexes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function SignUpPage({ isLoading, signupHandler }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // email and password validation with regex
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        setIsEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setIsPasswordValid(passwordRegex.test(password));
    }, [password]);

    // submit form handler
    async function submitHandler(event) {
        event.preventDefault();
        if (!email.length || !password.length || password !== rePassword || !isEmailValid || !isPasswordValid) return;
        await signupHandler(email, password);
    }

    return (
        <div className={'form'}>
            <p>Sign Up</p>

            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    className={!isEmailValid ? 'inputError' : 'inputSuccess'}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    className={!isPasswordValid ? 'inputError' : 'inputSuccess'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    className={password !== rePassword ? 'inputError' : 'inputSuccess'}
                    placeholder="Enter your password again"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />

                <button type="submit">{isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'Sign up'}</button>

                <Link href="/auth/login">i already have an account</Link>
            </form>
        </div>
    );
}

export default SignUpPage;
