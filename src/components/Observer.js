import { useEffect, useRef } from 'react';

const Observer = ({ onChange }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry && entry.isIntersecting) {
          onChange();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    if(ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  const style = {
    height: '1px',
    position: 'relative',
    bottom: '100px',
    border: '2px solid white'
  }

  return (
    <div className="observer" style={style} ref={ref}  ></div>
  )
}

export default Observer
