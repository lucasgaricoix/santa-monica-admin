import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";

type Books = {
  _id: string;
  name: string;
  email: string;
  bookDate: Date;
};

function ListPage() {
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadBooks();
    setLoading(false);
  }, []);

  async function loadBooks() {
    setLoading(true);
    const response = await axios.get(
      "https://santa-monica-server.herokuapp.com/book"
    );
    setBooks(response.data);
  }

  async function updateData(data: Books) {
    await axios
      .put(`https://santa-monica-server.herokuapp.com/book/${data._id}`, data)
      .then(() => {
        loadBooks();
      })
      .finally(() => setLoading(false));
  }

  async function deleteData(data: Books) {
    await axios
      .delete(`https://santa-monica-server.herokuapp.com/book/${data._id}`)
      .then(() => {
        loadBooks();
      })
      .finally(() => setLoading(false));
  }

  async function createData(data: Books) {
    await axios
      .post(`https://santa-monica-server.herokuapp.com/book`, data)
      .then(() => {
        loadBooks();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <MaterialTable
      title="Reservas"
      columns={[
        { title: "Nome", field: "name", type: "string" },
        { title: "E-mail", field: "email", type: "string" },
        { title: "Data da Reserva", field: "bookDate", type: "date" }
      ]}
      data={books}
      isLoading={loading}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            console.log(newData);
            setTimeout(() => {
              resolve(createData(newData));
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(updateData(newData));
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(deleteData(oldData));
            }, 600);
          })
      }}
    />
  );
}

export default ListPage;
