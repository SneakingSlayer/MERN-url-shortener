import React, { useState, useRef, useEffect } from "react";
import Upnavbar from "../../components/userpage/navbar/Upnavbar";
import { Container, Row, Col, Form, Modal, Table } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { isValidURL, formatDate } from "../../utils";
import axios from "axios";
import { BASE_URL, config } from "../../globals/globals";
import { FaTimes } from "react-icons/fa";

import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { IoColorFill } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";

export default function UrlsPage() {
  const [URLs, setURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [urlValid, setUrlValid] = useState(true);

  const [show, setShow] = useState(false);
  const [deleteParams, setDeleteParams] = useState({});

  const [urlExists, setUrlExists] = useState(false);

  const urlRef = useRef();
  const nameRef = useRef();
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [currentShort, setCurrentShort] = useState("");

  const fetchURLs = async () => {
    await axios
      .get(`${BASE_URL}/api/user/${id}`, {
        headers: config,
      })
      .then((res) => {
        setURLs(res.data);
        setCollection(cloneDeep(res.data.slice(0, countPerPage)));
      })
      .catch((err) => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidURL(urlRef.current.value)) {
      setUrlValid(false);
      setUrlExists(false);
      return;
    }
    setUrlValid(true);
    setLoading(true);
    setUrlExists(false);
    await axios
      .post(
        `${BASE_URL}/t`,
        { id: id, url: urlRef.current.value, urlName: nameRef.current.value },
        {
          headers: config,
        }
      )
      .then((res) => {
        setLoading(false);
        setCurrentShort(res.data.shortened_url);
        console.log("submitted", res);
      })
      .catch((err) => {
        setLoading(false);
        setUrlExists(true);
        console.log("submitted", err);
      });
  };

  const handleDelete = async (URLId) => {
    setLoading(true);
    try {
      await axios
        .delete(`${BASE_URL}/api/user/${id}`, {
          headers: config,
          data: {
            id: URLId,
          },
        })
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  useEffect(() => {
    fetchURLs();
  }, [loading]);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(currentShort);
  };

  const handleModal = (url, id) => {
    setShow(true);
    setDeleteParams({
      url: url,
      id: id,
    });
  };

  /////////////////////////////////////////////

  const countPerPage = 5;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [collection, setCollection] = useState([]);
  console.log();
  const tableHead = {
    url_name: "URL name",
    shortened_url: "Shortened URL",
    view_count: "View count",
    date_created: "Date created",
    action: "Actions",
  };

  const searchData = () => {
    const data = cloneDeep(
      URLs.filter((url) =>
        url.url_name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, countPerPage)
    );
    setCollection(data);
  };

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData();
    }
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(URLs.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  /**  const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
      };

      const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
          <td key={index}>{title}</td>
        ));
      };*/

  return (
    <>
      <Upnavbar />

      <Modal
        size="sm"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <BiTrash color="#FF6148" fontSize={32} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="fw-bold hero-title">Delete this URL?</h4>
          <p className="mb-0 text-muted small">
            Are you sure you want to delete this? This action cannot be undone.
          </p>
          <p
            style={{ color: "#FF6148", wordWrap: "break-word" }}
            className="mb-0 mt-2"
          >
            {deleteParams.url}
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Row className="w-100">
            <Col className="ps-0 pe-2" xs={5} sm={5} md={5}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShow(false);
                }}
                className="modal-btn-outline"
              >
                Cancel
              </button>
            </Col>
            <Col className="ps-2 pe-0" xs={7} sm={7} md={7}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(deleteParams.id);
                  setShow(false);
                }}
                className="modal-btn"
              >
                Delete
              </button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="mt-4 mb-2">
          <Col>
            <h2 className="fw-bold hero-title">URL Shortener</h2>
            {urlValid ? null : (
              <p className="danger small mb-0 text-danger">
                Invalid URL format
              </p>
            )}
            {urlExists ? (
              <p className="danger small mb-0 text-danger">
                URL already shortened.
              </p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Row className="d-flex align-items-center">
              <Col className="pt-2 pd-2" md={4}>
                <input
                  ref={nameRef}
                  className="form-input"
                  placeholder="URL name"
                  required
                />
              </Col>
              <Col className="pt-2 pd-2" md={6}>
                <input
                  ref={urlRef}
                  className="form-input"
                  placeholder="Shorten your URL"
                  required
                />
              </Col>
              <Col className="pt-2 pd-2" md={2}>
                <button className="form-btn">Shorten</button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>
          <Form>
            <Row className="d-flex align-items-center">
              {currentShort != "" ? (
                <>
                  <Col md={10}>
                    <h6 className="mb-0">
                      Shortened URL:{" "}
                      <a href={currentShort} target="_blank">
                        {currentShort}
                      </a>
                    </h6>
                  </Col>
                  <Col className="pt-2 pd-2" md={2}>
                    <button onClick={copyToClipboard} className="form-btn">
                      Copy link
                    </button>
                  </Col>
                </>
              ) : null}
            </Row>
          </Form>
        </Row>
        <Row className="mt-4">
          <h2 className="fw-bold hero-title">URLs</h2>
          <div className="mt-3 mb-3">
            <input
              className="form-input"
              placeholder="Search URL name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <Table responsive borderless className="url-table mb-3">
            <thead>
              {/**<tr>{headRow()}</tr>*/}
              <tr>
                <td className="fw-bold text-muted">{tableHead.url_name}</td>
                <td className="fw-bold text-muted">
                  {tableHead.shortened_url}
                </td>
                <td className="fw-bold text-muted">{tableHead.view_count}</td>
                <td className="fw-bold text-muted">{tableHead.date_created}</td>
                <td className="fw-bold text-muted">{tableHead.action}</td>
              </tr>
            </thead>
            <tbody>
              {/**URLs.length > 0? tableData() : <span>loading</span>*/}

              {collection.map((data) => (
                <tr key={data._id}>
                  <td className="align-middle small fw-bold">
                    {data.url_name}
                  </td>
                  <td className="align-middle small">
                    <a
                      style={{ color: "#FF6148", textDecoration: "none" }}
                      href={data.shortened_url}
                      target="_blank"
                    >
                      {data.shortened_url}
                    </a>
                  </td>
                  <td className="align-middle small">{data.view_count}</td>
                  <td className="align-middle small">
                    {formatDate(data.date_created)}
                  </td>
                  <td className="align-middle small">
                    <button
                      className="table-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleModal(data.shortened_url, data._id);
                      }}
                    >
                      <FaTimes fontSize={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {URLs.length <= 0 ? (
            <span className="font-italic text-muted text-center">
              No URLs shown.
            </span>
          ) : null}

          {URLs.length <= 0 ? null : (
            <Pagination
              pageSize={countPerPage}
              onChange={updatePage}
              current={currentPage}
              total={URLs.length}
            />
          )}
        </Row>
      </Container>
    </>
  );
}
