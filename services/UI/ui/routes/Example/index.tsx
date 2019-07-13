// UI/ui/routes/Example/index.tsx
import React, { FunctionComponent } from 'react'

interface ExampleRouteProps {}

type ExampleRouteType = FunctionComponent<ExampleRouteProps>

const ExampleRoute: ExampleRouteType = () => {
  return (
    <div>
      <h1>Example Route</h1>
    </div>
  )
} 

export default ExampleRoute