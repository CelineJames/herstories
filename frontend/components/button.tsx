type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps): React.ReactElement {
  return (
    <button
      className={`bg-secondary text-sm text-white px-3 py-1 rounded-2xl mb-5 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
