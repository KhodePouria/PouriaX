import Image from 'next/image';
import pfp from '@/app/public/jpeg.jpeg';
export default function About(){
    return(
        <div>
            {/* about card */}
            <div className='flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-15'>
                    <div className='flex-shrink-0'>
                        <Image 
                            src={pfp} 
                            alt='A portrait photo' 
                            width={250} 
                            height={250} 
                            className='rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 shadow-lg'
                        />
                    </div>
                    <div className='flex flex-col gap-3 sm:gap-4 text-center lg:text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
                        <div className='flex flex-row justify-center lg:justify-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
                            <h2>About</h2>
                            <h2 className='text-[#92856A] ml-2'>Me</h2>
                        </div>
                        
                        <p className='para text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed'>
                            I&apos;ve always been drawn to things that let me create &mdash; sometimes with guitar, sometimes with drawing, and often with code. Whether I&apos;m sketching an idea on paper or building it in a browser, it&apos;s all part of the same rhythm: making something out of nothing. That&apos;s what keeps me going.
                        </p>
                    </div>
                </div>
                {/* about card clone */}
                <div className='second flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 absolute inset-0 bg-transparent p-4 sm:p-6 lg:p-15 rounded-3xl border-2
                border-[#ffeabb]' style={{
                    opacity: "var(--opacity, 0)",
                    mask: `
                      radial-gradient(
                        35rem 35rem at var(--x) var(--y),
                        #000 0%,
                        transparent 50%
                      )`,
                    WebkitMask: `
                      radial-gradient(
                        35rem 35rem at var(--x) var(--y),
                        #000 1%,
                        transparent 50%
                      )`,
                  }}>
      
                    <div className='flex-shrink-0'>
                        <div 
                            
                            className='rounded-full object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 shadow-lg'
                        />
                    </div>
                    <div className='flex flex-col gap-3 sm:gap-4 text-center lg:text-left max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-transparent select-none'>
                        <div className='flex flex-row justify-center lg:justify-start text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
                            <h2>About</h2>
                            <h2 className='ml-2 text-transparent select-none'>Me</h2>
                        </div>
                        
                        <p className='para text-sm sm:text-base lg:text-lg leading-relaxed text-transparent select-none'>
                        I&apos;ve always been drawn to things that let me create &mdash; sometimes with guitar, sometimes with drawing, and often with code. Whether I&apos;m sketching an idea on paper or building it in a browser, it&apos;s all part of the same rhythm: making something out of nothing. That&apos;s what keeps me going.
                        </p>
                    </div>
                </div>
        </div>
    )
}