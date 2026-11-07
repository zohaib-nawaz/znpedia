type UserMessageProps = {
  content: string;
  label: string;
};

export function UserMessage({ content, label }: UserMessageProps) {
  return (
    <article className="flex justify-end" aria-label={label}>
      <p className="max-w-[85%] whitespace-pre-wrap break-words rounded-3xl rounded-br-lg bg-muted px-4 py-2.5 text-[15px] leading-7 text-foreground sm:max-w-[75%]">
        {content}
      </p>
    </article>
  );
}
