'use client'

import Image from 'next/image'
import Container from './components/Container'
import { GoVerified } from 'react-icons/go';
import ActionButton from './components/ActionButton';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div className='min-h-[62vh]'>
      <Container>
        <div className='pt-5'>
          <div className='flex flex-col xl:flex-row gap-4 md:gap-0 items-center'>
            <div className='flex flex-col items-start gap-4'>
              <p className='text-[42px] font-bold text-blue-700'>
                Find, book, rent a car - quick and super easy!
              </p>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row items-center gap-2'>
                  <GoVerified className="fill-blue-400" size={20}/>
                  <p className='text-xl text-blue-400 font-semibold'>
                    New cars
                  </p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <GoVerified className="fill-blue-400" size={20}/>
                  <p className='text-xl text-blue-400 font-semibold'>
                    Free delivery within the city
                  </p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <GoVerified className="fill-blue-400" size={20}/>
                  <p className='text-xl text-blue-400 font-semibold'>
                    Reservations and roadside assistance 24/7
                  </p>
                </div>
              </div>
              <p className='text-2xl text-neutral-500 font-semibold'>
                Find your perfect car from the models we offer 
              </p>
              <ActionButton label="Explore cars" onClick={() => router.push('/models')}/>
              <div>
                <p className='text-2xl text-neutral-500 font-semibold'>
                  Book a car online for your trip, in 3 simple steps:
                </p>
                <ol className='list-decimal [&>li]:ml-5'>
                  <li className='text-neutral-500 text-xl'>
                    Choose the desired car
                  </li>
                  <li className='text-neutral-500 text-xl'>
                    Select the necessary extra options
                  </li>
                  <li className='text-neutral-500 text-xl'>
                    You complete the rental of the desired car
                  </li>
                </ol>
              </div>
              <ActionButton label='Rent a car' onClick={() => router.push('/rent')} />
            </div>

            <div className='mt-10 lg:mt-8 w-full relative'>
              <img alt="car" src='/images/hero-car.png' width={0} height={0} className='w-auto h-auto'/>
              <img alt="hero-bg" src='/images/hero-bg.png' className='absolute w-auto h-auto -z-10 -top-[50px] ' width={0} height={0} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
