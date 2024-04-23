import { Pagination } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  userId: number;
  title: string;
}

export default function App(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterLimit, setFilterLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const indexofLastPost: number = currentPage * filterLimit;
  const indexofFirstPost: number = indexofLastPost - filterLimit;
  const currentPosts: Post[] = posts.slice(indexofFirstPost, indexofLastPost);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col p-5 min-h-screen">
      <div className="w-[80%]">
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "10px",
            marginTop: "15px",

          }}
        >React Table Data</h1>
        <select
          className="p-2 px-6 pl-7 border rounded-md mb-5 focus:outline-none cursor-pointer"
          name="limit"
          id="limit"
          onChange={handleOnChange}
          value={filterLimit.toString()}
        >
          <option value='10'>Filter</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>


        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">UserId</th>
              <th className="px-4 py-2">Title</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item: Post) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.userId}</td>
                <td className="px-4 py-2">{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Pagination
          total={posts.length / filterLimit}
          defaultCurrent={currentPage}
          pageSize={filterLimit}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>

  );
}
