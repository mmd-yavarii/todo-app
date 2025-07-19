import LogInPage from '@/components/templates/LogInPage';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // log in handler
    async function loginHandler(email, password) {
        setIsLoading(true);
        const response = await fetch('/api/auth/login', {
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

    return <LogInPage isLoading={isLoading} loginHandler={loginHandler} />;
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
