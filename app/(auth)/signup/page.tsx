import { ResolvingMetadata, Metadata } from 'next';
import { SignupForm } from './signup-form';

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
    title: 'Sign Up',
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      description: `Sign Up`,
    },
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <SignupForm />;
}
