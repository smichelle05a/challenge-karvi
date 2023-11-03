import classNames from 'classnames'
import React, { cloneElement } from 'react'
import accordionStyles from '../Accordion.module.scss'

export interface BodyProps extends React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode[]
}

export const Body = ({ className, children, ...r }: BodyProps) => {
  const classes = classNames(accordionStyles['accordion-body'], className)
  return (
    <div className={classes} {...r}>
      {children?.map(child =>
        cloneElement(child as React.ReactElement, {
          className: `${accordionStyles['accordion-item']}`,
        })
      )}
    </div>
  )
}

