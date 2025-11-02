import { Icon } from '@iconify/react';

const MenuItem = (props: { label: string; isMulti?: boolean }) => {
  return (
    <span
      className={`text-primary font-semibold text-lg flex items-center gap-0.5 cursor-pointer px-2 py-1 rounded-md hover:bg-primary/10 transition-all duration-200`}
    >
      {props.label}
      {props.isMulti && (
        <Icon
          icon={'mdi:chevron-down'}
          className={'text-2xl translate-y-0.25'}
        />
      )}
    </span>
  );
};

export default MenuItem;
