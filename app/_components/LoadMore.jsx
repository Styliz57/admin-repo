import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import Image from 'next/image';

const LoadMore = ({ onInView }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <div ref={ref}>
      <div className="flex items-center content-center justify-center w-full p-4">
        <Image src="/spinner.svg" alt="spinner" width={25} height={25} className="rotate" />
      </div>
    </div>
  );
};

export default LoadMore;
