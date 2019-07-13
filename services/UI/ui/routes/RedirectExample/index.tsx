// UI/ui/routes/RedirectExample/index.tsx
import React, { useContext, FunctionComponent } from 'react'
import { RouteComponentProps, redirectTo } from '@reach/router';
import { PropContext } from 'ui/Components/PropProvider';

interface RedirectExampleProps extends RouteComponentProps {

}

type RedirectExampleType = FunctionComponent<RedirectExampleProps>

const getProps = async () => {
  if (Math.random() < 0.5) await redirectTo('/')
  else return { title: 'Testing' }

}

const RedirectExample: RedirectExampleType = () => {
  const { useProps, props } = useContext(PropContext)
  useProps(getProps)

  return (
    <>
      <h1>Secret Admin Portal</h1>
      <h2>{props.title}</h2>
    </>
  )
  
}

export default RedirectExample