type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className="font-bold text-5xl animate-slideDown p-8 text-center">{title}</h1>;
}
