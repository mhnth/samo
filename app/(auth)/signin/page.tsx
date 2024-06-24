import { Metadata } from 'next';
import { SignInForm } from './signin-form';

export async function generateMetadata(): Promise<Metadata> {
  // fetch data here

  return {
    title: 'Sign In',
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      description: `sign in`,
    },
  };
}

export default function Page() {
  return <SignInForm />;
}
