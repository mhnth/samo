export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <span>Thêm danh mục</span>
      <form
        action="
    "
      >
        <div>
          <label htmlFor="name"></label>
        </div>
      </form>
    </div>
  );
}
