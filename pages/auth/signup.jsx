import SignUpPage from '@/components/templates/SignUpPage';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // sign up handler
    async function signupHandler(email, password) {
        setIsLoading(true);
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) router.replace('/');
        setIsLoading(false);
    }

    return <SignUpPage isLoading={isLoading} signupHandler={signupHandler} />;
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const tokenVerification = verifyToken(token);

    if (tokenVerification) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}
