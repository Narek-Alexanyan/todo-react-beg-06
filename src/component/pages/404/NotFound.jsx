import React from "react";

import styles from "./NotFound.module.scss";

function NotFound(props) {

    const pushAction = () => {
        props.history.push("/")
    }
  return (
    <div className={styles.body}>
      <div className={styles.div}>
        <aside className={styles.aside}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
            alt=" 404 page"
          />
        </aside>
        <main className={styles.main}>
          <h1>Sorry!</h1>
          <p>
            Either you aren't cool enough to visit this page or it doesn't exist{" "}
            <em>. . . like your social life.</em>
          </p>
          <button onClick={pushAction}>Go to home!</button>
        </main>
      </div>
    </div>
  );
}

export default NotFound;
