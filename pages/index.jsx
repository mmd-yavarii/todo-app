import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';

export default function Home({ info }) {
    const router = useRouter();

    async function logoutHandler() {
        const confirmation = confirm('Are you sure ?');
        if (!confirmation) return;

        const response = await fetch('/api/auth/logout');
        const result = await response.json();
        alert(result.message);
        if (response.ok) router.reload('/auth/login');
    }

    return (
        <>
            <h1>{info.email}</h1>
            <button onClick={logoutHandler}>Log out</button>
        </>
    );
}

export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const tokenVerification = verifyToken(token);
    if (!tokenVerification) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    return {
        props: {
            info: JSON.parse(JSON.stringify(tokenVerification)),
        },
    };
}
