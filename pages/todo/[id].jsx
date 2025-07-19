import TodoPage from '@/components/templates/TodoPage';
import Todo from '@/models/Todo';
import User from '@/models/User';
import { verifyToken } from '@/utils/auth';

export default function handler({ todoInfo }) {
    return <TodoPage {...todoInfo} />;
}

// validation todo's owner and get todo's information
export async function getServerSideProps(context) {
    const { id } = context.query;
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
        const todoInfo = await Todo.findOne({ _id: id });
        const userInfo = await User.findOne({ email: tokenVerification.email });

        if (!todoInfo || !userInfo) {
            return {
                notFound: true,
            };
        }

        if (todoInfo.userId.toString() !== userInfo._id.toString()) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }
        return {
            props: {
                todoInfo: JSON.parse(JSON.stringify(todoInfo)),
            },
        };
    } catch {
        return {
            notFound: true,
        };
    }
}
