interface IHeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: IHeadingProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold tracking-tight text-nowrap font-oswald">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
export default Heading;
