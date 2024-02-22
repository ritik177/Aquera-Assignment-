import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";

const Home = () => {
  const [data, setData] = useState([]);

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getdata = async () => {
    const response = await axios.get(
      "https://swapi.dev/api/planets/?format=json"
    );
    setData(response.data.results);
  };

  // handle next
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  // handle previous
  const handlePrevios = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    getdata();
  }, [page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(data.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page; // 5 *2 = 10
      const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [data, page]);

  return (
    <>
      <Container>
        <h1 style={{ color: "blue", textAlign: "center", margin: "24px" }}>
          User Data
        </h1>

        <div className="table_div mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rotation Period</th>
                <th>Orbital Period</th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Gravity</th>

                <th>Surface Water</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length > 0 ? (
                pageData.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.name}</td>
                      <td>{element.rotation_period}</td>
                      <td>{element.orbital_period}</td>
                      <td>{element.diameter}</td>
                      <td>{element.climate}</td>
                      <td>{element.gravity}</td>

                      <td>{element.surface_water}</td>
                      <td>{element.population}</td>
                    </tr>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center mt-4 ">
                  <span
                    style={{
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </span>{" "}
                  <Spinner animation="border" variant="danger" />
                </div>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
            {Array(pageCount)
              .fill(null)
              .map((ele, index) => {
                return (
                  <Pagination.Item
                    key={index + 1}
                    active={page === index + 1 ? true : false}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
            <Pagination.Next
              onClick={handleNext}
              disabled={page === pageCount}
            />
          </Pagination>
        </div>
      </Container>
    </>
  );
};

export default Home;
