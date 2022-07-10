import React from 'react'
import styles from './index.module.less'

interface Props {
  title: string
}

export default (props: Props) => {
  return (
    <div className={styles['sub-title']}>
      { props.title }
    </div>
  )
}
