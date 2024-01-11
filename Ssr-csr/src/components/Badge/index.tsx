import Image from 'next/image';

interface BadgePros {
  content: string;
}

const Badge: React.FC<BadgePros> = ({ content }) => {
  return (
    <div className='position-relative d-flex custom-badge__container mb-3 mb-xl-0 mx-auto'>
      <div className='custom-badge__content rounded-pill position-relative border border-primary border-5 p-5 d-flex overflow-hidden'>
        <Image
          src={content}
          alt='External content'
          fill
        />
      </div>
      <span className='custom-badge__icon rounded-pill border border-white border-5 bg-primary p-1 d-flex justify-content-center align-items-center position-absolute bottom-0 start-50'>
        <Image
          src='/icons/fire.svg'
          alt='me'
          width='18'
          height='23'
        />
      </span>
    </div>
  );
};

export default Badge;
