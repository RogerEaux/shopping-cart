import styles from '../styles/Links.module.css';

function Links({ direction }) {
  return (
    <>
      <ul className={`${styles[direction]}`}>
        <li className={styles.linksItem}>
          <a href="">Home</a>
        </li>
        <li className={styles.linksItem}>
          <a href="">Shop</a>
        </li>
      </ul>
    </>
  );
}

export default Links;
