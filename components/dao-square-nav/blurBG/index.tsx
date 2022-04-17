import styles from './index.module.css'

function BlurBG() {
  return (
    <>
      <div className={`${styles.blur_bg} ${styles.left}`} />
      <div className={`${styles.blur_bg} ${styles.right}`} />
    </>
  )
}

export default BlurBG
