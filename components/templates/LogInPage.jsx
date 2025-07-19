import { emailRegex, passwordRegex } from '@/utils/regexes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function LogInPage({ isLoading, loginHandler }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        if (!email.length || !password.length || !isEmailValid || !isPasswordValid) return;
        await loginHandler(email, password);
    }

    return (
        <div className={'form'}>
            <p>Log In</p>

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

                <button type="submit">{isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'Login'}</button>

                <Link href="/auth/signup">Create an account</Link>
            </form>
        </div>
    );
}

export default LogInPage;
