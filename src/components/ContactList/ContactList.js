import React from "react";
import PropTypes from "prop-types";
import s from "./ContactList.module.css";

const ContactList = ({ contactList, onDeleteContact }) => {
  return (
    <ul>
      {contactList.map(({ id, name, number }) => (
        <li className={s.element} key={id}>
          <p>{name}: </p>
          <p>{number}</p>
          <button
            className={s.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
