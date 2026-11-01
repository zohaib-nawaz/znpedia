import { Link2 } from "lucide-react";

type HeadingAnchorProps = React.ComponentPropsWithoutRef<"h2"> & {
  as: "h2" | "h3";
};

export function HeadingAnchor({ as: Tag, id, children, ...props }: HeadingAnchorProps) {
  const renderLink = () => {
    if (!id) {
      return null;
    }

    return (
      <a
        href={`#${id}`}
        className="heading-anchor ml-2 inline-flex align-middle text-muted-foreground no-underline opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
        aria-label="Link to this section"
      >
        <Link2 className="h-4 w-4" aria-hidden />
      </a>
    );
  };

  return (
    <Tag id={id} className="group" {...props}>
      {children}
      {renderLink()}
    </Tag>
  );
}
