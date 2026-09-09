import AuthForm from '../../components/auth-form';
export const metadata = { title: 'Set a new password', robots: { index: false, follow: false } };
export default function Page() { return <AuthForm mode="reset-password"/>; }
