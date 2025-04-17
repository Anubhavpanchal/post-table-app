import React, { useEffect, useState } from "react";
import { getPosts } from "../services/PostService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const PostTable = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  // 👉 Delete Function
  const handleDelete = (id) => {
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  // 👉 Save Edited Post
  const handleUpdate = () => {
    const updated = posts.map((post) =>
      post.id === selectedPost.id ? selectedPost : post
    );
    setPosts(updated);
    setIsDialogVisible(false);
  };

  // 👉 Action Button Template
  const actionTemplate = (rowData) => {
    let menu = null;

    const items = [
      {
        label: "Update",
        icon: "pi pi-pencil",
        command: () => {
          setSelectedPost({ ...rowData });
          setIsDialogVisible(true);
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => handleDelete(rowData.id),
      },
    ];

    return (
      <div>
        <Menu model={items} popup ref={(el) => (menu = el)} />
        <Button
          icon="pi pi-ellipsis-v"
          rounded
          text
          aria-label="Options"
          onClick={(e) => menu.toggle(e)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <h2>Posts Table</h2>
      <DataTable
        value={posts}
        paginator
        rows={10}
        tableStyle={{ minWidth: "70rem" }}
      >
        <Column field="id" header="ID" />
        <Column field="title" header="Title" />
        <Column field="body" header="Body" />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>

      <Dialog
        header="Update Post"
        visible={isDialogVisible}
        style={{ width: "40vw" }}
        onHide={() => setIsDialogVisible(false)}
      >
        <div className="field mb-3">
          <label>ID </label><br></br>
          <InputText value={selectedPost?.id} readOnly className="w-full"         style={{ width: "36vw" }}          />
        </div>
        <div className="field mb-3">
          <label>Title</label><br></br>
          <InputText
            value={selectedPost?.title}
            style={{ width: "36vw" }}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, title: e.target.value })
            }
            className="w-full"
          />
        </div>
        <div className="field mb-3">
          <label>Body</label><br></br>
          <InputText
            value={selectedPost?.body}
            style={{ width: "36vw" }}
            onChange={(e) =>
              setSelectedPost({ ...selectedPost, body: e.target.value })
            }
            className="w-full"
          />
        </div><br></br>
        <Button label="Save" icon="pi pi-check" onClick={handleUpdate} />
      </Dialog>
    </div>
  );
};

export default PostTable;
