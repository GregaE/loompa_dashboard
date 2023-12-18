import { ReactNode } from 'react';
import './Skeleton.scss';

interface SkeletonProps {
  show?: boolean;
  width?: number;
  height?: number;
  fullHeight?: boolean;
  children?: ReactNode;

}

export default function Skeleton({
  show,
  width,
  height,
  fullHeight,
  children,
} : SkeletonProps) {
  const styleProps = {
    '--width': `${width}%`,
    '--height': fullHeight ? '100%' : `${height}rem`,
  } as React.CSSProperties;

  return (
    <>
      { show ? (
        <div className="skeleton" style={styleProps}>
          <span className="sr-only">Loading</span>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
