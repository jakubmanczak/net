const GenericCard = (props: {
  text?: string;
  icon?: () => JSX.Element;
  iconbr?: () => JSX.Element;
}) => {
  return (
    <div className="aspect-[52/72] relative w-24 p-1 flex flex-col gap-2 border border-neutral-700 rounded-md bg-black">
      <p className="font-bold text-center text-neutral-500">{props.text}</p>
      {props.icon && (
        <div className="my-auto mx-auto scale-[1.75]">{props.icon()}</div>
      )}
      {props.iconbr && (
        <div className="absolute bottom-1 right-1 text-neutral-800 scale-[.8]">
          {props.iconbr()}
        </div>
      )}
    </div>
  );
};

export { GenericCard };
