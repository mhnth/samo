import { Input } from '@/components/ui';
import Link from 'next/link';
import { EditProject } from './edit-project';

const initialState = {
  message: '',
  isOk: false,
};

export default async function AddBudgetPage({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const projectId = params.projectId;

  const project = await prisma?.financialProject.findUnique({
    where: { id: projectId },
  });

  if (!project) return <div>Không tìm thấy Dự án này</div>;

  return <EditProject project={project} />;
}
