import React from "react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import styles from "./Item.module.css";

export const Item = ({ handlerText, onChange, id, text, editTask, deleteTask}) => {
  return (
    <>
      <li key={id} className={styles.item}>
        <div className={styles.items}>
          <label className={styles.checkbox}>
            <Input
              className={styles.input}
              onChange={onChange}
              type="checkbox"
            />
            <div className={styles.checkmark}></div>
          </label>
          <div className={styles.texts}>
            <p>{text}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          {/* <Button
            className={styles.button_edit}
            onClick={editTask}
            children="✏️"
          /> */}
          <Button className={styles.button} onClick={deleteTask} children="×" />
        </div>
      </li>
    </>
  );
};