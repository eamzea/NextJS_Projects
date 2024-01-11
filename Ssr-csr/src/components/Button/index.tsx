import classNames from 'classnames';
import { ButtonVariants, ButtonSizes } from '@/ts';
import Image from 'next/image';
import { useState } from 'react';

interface ButtonProps {
  content: string | JSX.Element;
  size?: ButtonSizes;
  variant?: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({ content, size, variant = 'primary' }) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);

  const classes = classNames(`btn btn-${variant} font-georgia`, {
    'btn-sm': size === 'md',
    'btn-lg': size === 'lg',
    'text-white': !['white', 'code'].includes(variant),
    'btn-code-copied': hasBeenCopied && variant === 'code',
  });

  const handleCopy = () => {
    if (!hasBeenCopied) {
      setHasBeenCopied(true);
    }
  };

  return (
    <div className='d-grid'>
      <button
        className={classes}
        type='button'
        onClick={handleCopy}
      >
        {content}
        {variant === 'code' && (
          <span className='ms-1'>
            <Image
              src='/icons/copy.svg'
              alt='me'
              width='18'
              height='23'
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
