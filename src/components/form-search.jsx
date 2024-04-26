import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container} from "react-bootstrap";
import '../style/styles.css';

export function FormSearch(props) {
  const [searchFilter, setSearchFilter] = useState(props.searchFilter || "");

  useEffect(() => {
    setSearchFilter(props.searchFilter);
  }, [props]);

  const handleChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    let s = searchFilter;

    switch (id) {
      case "search":
        s = val;
        break;
        default:
        return;
    }
    setSearchFilter(s);
  };
  const onSave = (e) => {
    e.searchFilter = searchFilter;
    props.onSave(e);
  };

  return (
    <>
      <Container fluid>
        <Form className="d-flex">
          <Form.Control type="text" id="search" placeholder="Search" className="me-2" aria-label="Search" value={searchFilter} onChange={handleChange}/>
          <Button variant="outline-success" onClick={onSave}>Search</Button>
        </Form>
      </Container>
    </>
  );
}


