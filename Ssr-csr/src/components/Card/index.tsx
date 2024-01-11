import { Response } from '@/ts';
import Badge from '../Badge';
import Button from '../Button';
import Icon from '../Icons';

interface CardProps {
  data: Response;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className='col-7 border border-light-grey rounded mx-auto'>
      <div className='row justify-content-around gap-1 p-4'>
        <div className='col-12 col-xl-2 order-1 mb-3 mb-0'>
          <Badge content={data.externalUrl} />
        </div>
        <div className='col-12 col-xl-5 order-3 order-xl-2'>
          <div className='row mb-xl-3 text-center text-xl-start'>
            <p className='text-primary font-georgia fw-bold mb-1'>
              {data.ctbrand_name} {'//'} {data.ctproduct_group}
            </p>
            <p className='text-primary font-arial fw-bold h5 mb-2'>
              Open Account Offer - Bet {data.ctminimum_deposit} & Get {data.ctmax_refund} in Free
              Bets for new customers
            </p>
            <p className='text-medium-gray fs-7 font-georgia mb-3'>Terms & Conditions Apply</p>
          </div>
          <div className='row'>
            <div className='col-10 mb-2 mx-auto mx-xl-0'>
              <Button
                content={data.ctpromo_code}
                variant='code'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-10 mx-auto mx-xl-0'>
              <Button
                content='Visit Site'
                variant='secondary'
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-xl-4 order-2 order-xl-3 mb-3 mb-xl-0'>
          <div className='row mb-xl-3'>
            <div className='col d-flex align-items-center justify-content-center justify-content-xl-start gap-1'>
              <Icon.Star />
              <Icon.Star />
              <Icon.Star />
              <Icon.Star />
              <Icon.Star />
              <p className='font-georgia text-primary fs-7 mb-0'>Read Review</p>
            </div>
          </div>
          <div className='row d-none d-xl-block'>
            <ul className='font-georgia fs-7'>
              <li className='mb-1'>Nostrud non velit ad in tempor.</li>
              <li className='mb-1'>Nostrud non velit ad in tempor.</li>
              <li className='mb-1'>Nostrud non velit ad in tempor.</li>
              <li className='mb-1'>Nostrud non velit ad in tempor.</li>
              <li className='mb-1'>Nostrud non velit ad in tempor.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='border-top border-light-grey bg-shade-gray p-3'>
        <p className='fs-7 font-georgia text-medium-gray mb-0'>{data.ctoffer_tc}</p>
      </div>
    </div>
  );
};

export default Card;
