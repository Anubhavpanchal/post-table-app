import React, { useEffect, useState } from "react";
import { getPosts } from "../services/PostService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PostTable = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <h2>Posts Table</h2>
      <DataTable value={posts} paginator rows={10} tableStyle={{ minWidth: "60rem" }}>
        <Column field="id" header="ID" />
        <Column field="title" header="Title" />
        <Column field="body" header="Body" />
      </DataTable>
    </div>
  );
};

export default PostTable;
