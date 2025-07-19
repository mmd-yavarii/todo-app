import TodoCard from '@/components/modules/TodoCard';
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
                <h3>{info.email}</h3>

                <div>
                    <Link className="addBtn" href="/add-todo">
                        +
                    </Link>
                    <button onClick={logoutHandler}>Log out</button>
                </div>
            </div>

            {userTodos.length ? (
                userTodos.map((i) => <TodoCard key={i._id} {...i} />)
            ) : (
                <p style={{ marginTop: '300px', textAlign: 'center' }}>There's no todo yet</p>
            )}
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
        const userTodos = await Todo.find({ userId }).sort({ createdAt: -1 });

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
