// UI/ui/Components/LoadingComponent/index.tsx
import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';

export const Loading = () => {
  return (
    <div style={{ top: '50%', left: '50%' }}>
      <CircularProgress size={72} />
    </div>
  );
};
