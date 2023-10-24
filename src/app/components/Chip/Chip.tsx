import React from 'react'
import classNames from 'classnames'
import ChipStyles from './Chip.module.scss'
import { CloseIcon } from '../Icons'

export interface ChipProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
  children?: React.ReactNode
}
export const Chip = ({className, children, ...r}: ChipProps) => {
  const classes = classNames( ChipStyles.chip, className)
  return (
    <div className={classes} {...r}>
      {children}
      <CloseIcon width={16} height={16} className={ChipStyles.closeIcon} />
    </div>
  )
}

export default Chip