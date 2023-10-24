import classNames from 'classnames'
import React from 'react'
import accordionStyles from '../Accordion.module.scss'

export interface BodyProps extends React.ComponentPropsWithRef<'div'> {
  items: string[] | number []
}

export const Body = ({ className, items, ...r }: BodyProps) => {
  const classes = classNames(accordionStyles['accordion-body'], className)
  return (
    <div className={classes} {...r}>
      {items.map((item, i) => (
        <p className={accordionStyles['accordion-item']} key={i}>
          {item}
        </p>
      ))}
    </div>
  )
}

