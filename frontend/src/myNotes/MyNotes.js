import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../actions/notesActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/Erroressage"; // Corrected import name
import { useNavigate } from "react-router-dom";

function MyNotes({ search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? You want to delete this note")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());

    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete]);

  return (
    <div>
      {userInfo ? (
        <Accordion>
          <MainScreen title={`Welcome back ${userInfo.name}`} children="put all your notes here">
            <Link to={"create"}>
              <Button style={{ marginLeft: 10, marginBottom: 9, backgroundColor: "#28b62c" }} size="lg">
                Create New Note
              </Button>
            </Link>

            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            {notes
              ?.slice()
              .reverse()
              .filter((note) => {
                return search
                  ? note.title.toLowerCase().includes(search.toLowerCase())
                  : true;
              })
              .map((note, index) => (
                <Accordion.Item key={note._id} eventKey={index.toString()}>
                  <Card style={{ margin: 10 }}>
                    <Card.Header style={{ display: "flex" }}>
                      <span
                        style={{
                          color: "black",
                          textDecoration: "none",
                          flex: 1,
                          cursor: "pointer",
                          alignSelf: "center",
                          fontSize: 20,
                        }}
                      >
                        <Accordion.Header>{note.title}</Accordion.Header>
                      </span>
                      <div>
                        <Button variant="light" href={`/mynotes/${note._id}`}>
                          Edit
                        </Button>
                        <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Accordion.Body>
                        <h4>
                          <Badge bg="primary">category: {note.category}</Badge>
                        </h4>
                        <p>{note.content}</p>
                      </Accordion.Body>
                      <blockquote className="blockquote mb-0">
                        <footer className="blockquote-footer">
                          created on <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                </Accordion.Item>
              ))}
          </MainScreen>
        </Accordion>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MyNotes;
