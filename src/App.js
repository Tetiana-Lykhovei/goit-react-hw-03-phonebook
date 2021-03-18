import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    // const { contacts } = this.state;
    const persistedData = JSON.parse(localStorage.getItem("contacts"));
    if (persistedData) {
      this.setState(() => ({ contacts: [...persistedData] }));
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      // console.log(this.state.contacts);
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  submitHandler = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  filterChange = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  renderFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filtered = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filtered)
    );
  };

  deleteContact = (contactEl) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactEl
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const {
      submitHandler,
      filterChange,
      renderFilteredContacts,
      deleteContact,
    } = this;
    const filteredContacts = renderFilteredContacts();

    return (
      <div className="App">
        <h1 className="title">Phonebook</h1>
        <ContactForm onSubmit={submitHandler} />

        <h2 className="title">Contacts</h2>
        <Filter filterValue={filter} onFilter={filterChange} />
        <ContactList
          contactList={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}

export default App;
