import { Icon, type IconifyIcon } from '@iconify/react';

const SecondaryButton = (props: {
  label: string;
  onClick?: () => void;
  icon?: IconifyIcon | string;
  className?: string;
}) => {
  return (
    <button
      className={
        'py-1.25 px-3 flex items-center gap-1 ' +
        'bg-secondary text-primary font-semibold rounded-xl border-1 border-primary/30 cursor-pointer ' +
        'hover:bg-primary hover:text-secondary transition-all duration-200 ' +
        (props.className || '')
      }
      onClick={props.onClick}
    >
      {props.icon && <Icon icon={props.icon} className="text-xl" />}
      {props.label}
    </button>
  );
};

export default SecondaryButton;
