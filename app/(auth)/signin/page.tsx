import { ResolvingMetadata, Metadata } from 'next';
import { SignInForm } from './signin-form';

type Props = {
  params: { novel: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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
