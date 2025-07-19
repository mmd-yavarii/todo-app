import Todo from '@/models/Todo';
import User from '@/models/User';
import { verifyToken } from '@/utils/auth';
import connectDb from '@/utils/connectDb';

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ info, userTodos }) {
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
            <div className="userInfo">
                <h4>{info.email}</h4>

                <div>
                    <Link href="/add-todo">Add new todo</Link>
                    <button onClick={logoutHandler}>Log out</button>
                </div>
            </div>
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
    try {
        await connectDb();

        const { _id: userId } = await User.findOne({ email: tokenVerification.email });
        const userTodos = await Todo.find({ userId });

        return {
            props: {
                info: JSON.parse(JSON.stringify(tokenVerification)),
                userTodos: JSON.parse(JSON.stringify(userTodos)),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
}
